var Backbone = require('backbone');
window.Backbone = Backbone
Backbone.$ = require('jquery');
var AvatarView = require('./AvatarView')
var _ = require('underscore');
var Marionette = require('backbone.marionette');
var template = require('../template/VideoManagerView.tpl')
var App = require('App');
var $ = require('jquery');
var VideoContainer = require('VideoContainer');
var ImageContainer = require('ImageContainer');

var VideoManagerView = Marionette.CompositeView.extend({
	className: 'videoManager-view',
	template: _.template(template),
	childView: AvatarView,
	childViewContainer: function() {
		return '#avatarWrapper';
	},

	childEvents: {
		'avatar:stateChange': 'onAvatarStateChange'
	},
	/*
	 * Steps:
	 * 0 -> video tutorial
	 * 1 -> video introduction
	 * 2 -> video transition cockpit
	 * 3 -> video cockpit in space
	 */

	initialize: function() {
		this.videoContainer = new VideoContainer();
		this.videoContainer.setVideo('videos/tuto', 1080, 1920);
		this.videoContainer.once('end', this.onvideoContainerEnded.bind(this));
		this.listenToOnce(App, 'app:startTutorial', this.launchVideoTutorial);
		this.videoContainer.hide();

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
	/*
	 * VideoContainer method
	 */
	showVideoContainer: function() {
		this.videoContainer.show();
		this.videoContainer.play();
	},
	resetVideoContainer: function() {
		this.videoContainer.hide();
		this.videoContainer.flush();
	},
	onvideoContainerEnded: function() {
		console.log('end video')

		this.resetVideoContainer();

		// set the next video
		switch (this.step) {
			case 0:
				console.log('intro video')
				this.videoContainer.setVideo('videos/intro', 1080, 1920);
				break;
			case 1:
				console.log('construction-fusee video')
				this.videoContainer.setVideo('videos/cockpit', 1080, 1920);
				break;
			case 2:
				console.log('cockpit in space video')
				this.videoContainer.setVideo('videos/decollage', 1080, 1920);
				this.listenToOnce(App,'app:cockpitTakeOff',this.launchVideoTakeOff);
				break;
			case 3:
				console.log('trigger ta race pd')
				App.trigger('app:cockpitTakeOffFinished')
			break;
		}

		this.imageContainer.show();
		this.toogleInteractivity();

		this.step += 1;

	},
	/*
	 * Methods which manager launch of videos
	 */
	launchVideoTutorial: function() {
		console.log('start video tutorial')
		this.showVideoContainer();
	},
	launchVideoIntro: function() {
		console.log('start video intro')
			// App.trigger('app:startIntroduction');

		this.toogleInteractivity();
		this.collection.reset();
		this.ui.avatarWrapper.remove();
		this.showVideoContainer();

		this.imageContainer.flush();
		this.imageContainer.setImage('images/intro/construction-fusee.jpg', 1080, 1920);
		this.videoContainer.once('end', this.onvideoContainerEnded.bind(this));
	},
	launchVideoTransitionCockpit: function() {
		console.log('start video transitionCockpit');
		this.ui.exerciceConstructionRocket.remove();
		this.showVideoContainer();
		App.navigate('experience/cockpit', {
			trigger: false
		});

		_.delay(function() {
			App.trigger('app:startCockpit')
		}, 10000);

		this.imageContainer.flush();
		this.imageContainer.setImage('images/intro/cockpit.jpg', 1080, 1920);

		this.videoContainer.once('end', this.onvideoContainerEnded.bind(this));
	},
	launchVideoTakeOff:function() {
		console.log('start video decollage');
		this.showVideoContainer();
		this.imageContainer.flush();
		this.imageContainer.setImage('images/intro/stars.png', 1080, 1920);
		this.videoContainer.once('end', this.onvideoContainerEnded.bind(this));
	},

	/*
	 *
	 */
	onClockexerciceConstructionRocket: function() {
		if (!this.interactive && this.step != 1) return;
		this.launchVideoTransitionCockpit();
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
		console.log('toogleInteractivity'+this.interactive,this.step)
		if (this.children)
			this.children.call("toogleInteractivity");
	}


})


module.exports = VideoManagerView;