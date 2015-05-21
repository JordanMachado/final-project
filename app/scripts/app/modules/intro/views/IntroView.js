var Backbone = require('backbone');
window.Backbone = Backbone
Backbone.$ = require('jquery');
var AvatarView = require('./AvatarView')
var _ = require('underscore');
var Marionette = require('backbone.marionette');
var template = require('../template/IntroView.tpl')
var App = require('App');
var $ = require('jquery');
var VideoContainer = require('VideoContainer');
var ImageContainer = require('ImageContainer');

var IntroView = Marionette.CompositeView.extend({
	className: 'intro-view',
	template: _.template(template),
	childView: AvatarView,
	childViewContainer: function() {
		return '#avatarWrapper';
	},

	childEvents: {
		'avatar:stateChange': 'onAvatarStateChange'
	},


	initialize: function() {
		// console.log('intro-view')
		this.videoContainer = new VideoContainer();
		this.videoContainer.setVideo('videos/tuto', 1080, 1920);
		this.videoContainer.on('end', this.onvideoContainerEnded.bind(this));
		this.listenToOnce(App, 'app:startTutorial', this.launchvideoContainer);
		this.videoContainer.hide();

		// this.videoCockpit = new VideoContainer();
		// this.videoCockpit.setVideo('videos/cockpit', 1080, 1920);
		// this.videoCockpit.once('end', this.onVideoCockpitEnded.bind(this));
		// this.videoCockpit.hide();

		this.interactive = false;
		this.nbOfAvatarReady = 0;
		this.step = 0;

		this.imageContainer = new ImageContainer();
		this.imageContainer.setImage('images/intro/connexion.jpg', 1080, 1920);
		this.imageContainer.hide();

	},
	ui: {
		videoWrapper: '#videoWrapper',
		imageWrapper: '#imageWrapper',
		avatarWrapper: '#avatarWrapper',
		exerciceConstructionRocket: '#exerciceConstructionRocket'

	},
	events: {
		'click @ui.exerciceConstructionRocket': 'onClockexerciceConstructionRocket'
	},
	onRender: function() {
		this.ui.imageWrapper.append(this.imageContainer.el);
		this.ui.videoWrapper.append(this.videoContainer.el);

	},
	launchvideoContainer: function() {
		console.log('start video tutorial')
		this.videoContainer.show();
		this.videoContainer.play();

	},
	launchVideoIntro: function() {
		// App.trigger('app:startIntroduction');
		this.toogleInteractivity();
		this.collection.reset();
		this.ui.avatarWrapper.remove();
		this.videoContainer.show();
		this.videoContainer.play();

		this.imageContainer.flush();
		this.imageContainer.setImage('images/intro/construction-fusee.jpg', 1080, 1920);
	},

	onvideoContainerEnded: function() {
		console.log('end video')

		this.videoContainer.hide();
		this.videoContainer.flush();

		switch (this.step) {
			case 0:
				console.log('intro video')
				this.videoContainer.setVideo('videos/intro', 1080, 1920);
				break;
			case 1:
				console.log('construction-fusee video')
				this.videoContainer.setVideo('videos/cockpit', 1080, 1920)
				break;
		}

		this.imageContainer.show();
		this.toogleInteractivity();

		this.step += 1;

	},
	/*
	 *
	 */
	onClockexerciceConstructionRocket:function() {
		// if(!this.interactive && this.step!=1) return;
		console.log('launch video cockpit')
		this.videoContainer.show();
		this.videoContainer.play();
		this.imageContainer.flush();
		App.navigate('experience/cockpit',{trigger:false})
		_.delay(function(){
			console.log('yolo')
			App.trigger('app:startCockpit')	
		},10000);
	},
	/*
	 * Avatar method
	 */
	onAvatarStateChange: function(childView, options) {
		if (!this.interactive && this.step != 0) return;
		var state = (options.active == true) ? 1 : -1;
		this.nbOfAvatarReady += state;
		if (this.nbOfAvatarReady == 3)
			this.launchVideoIntro();
	},
	toogleInteractivity: function() {
		this.interactive = !this.interactive;
		if (this.children)
			this.children.call("toogleInteractivity");
	}


})


module.exports = IntroView;