var Backbone = require('backbone');
Backbone.$ = require('jquery');
var _ = require('underscore');
var Marionette = require('backbone.marionette');
var template = require('../template/IntroView.tpl')
var App = require('App');
var $ = require('jquery');
var VideoContainer = require('VideoContainer')

var IntroView = Marionette.ItemView.extend({
	className: 'intro-view',
	template: _.template(template),

	initialize: function() {
		console.log('intro-view')
		this.videoTutorial = new VideoContainer();
		this.videoTutorial.setVideo('videos/tuto', 1080, 1920);
		this.videoTutorial.once('end', this.onVideoTutorialEnded.bind(this));
		this.listenToOnce(App,'app:introStarted',this.lauchVideo);

		// this.videoIntro = new VideoContainer();
		// this.videoIntro.setVideo('videos/intro', 1080, 1920);
		// this.videoIntro.once('end', this.onVideoIntroEnded.bind(this));

		// this.videoIntro.hide();


	},
	ui: {
		videoWrapper: '#videoWrapper',
		connexion: '#connexion'
	},
	events: {
		'click @ui.connexion': 'onClickConnexion'
	},
	onRender: function() {
		console.log('show')
		this.ui.videoWrapper.append(this.videoTutorial.el);
		// this.videoTutorial.play();


	},
	lauchVideo:function() {
		this.videoTutorial.play();
		console.log('start video intro')
	},
	onVideoTutorialEnded: function() {
		console.log('video intro ended')
		this.videoTutorial.hide();
		this.videoTutorial.flush();
		this.ui.videoWrapper.append(this.videoIntro.el);;

	},
	onClickConnexion: function() {
		console.log('click connexion');
		// this.videoIntro.show();
		// this.videoIntro.play();

	},
	onVideoIntroEnded: function() {
		console.log('onVideoIntroEnded');
		//navigate to cockpit
	}


})


module.exports = IntroView;