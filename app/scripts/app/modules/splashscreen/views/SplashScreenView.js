var Backbone = require('backbone');
Backbone.$ = require('jquery');
var _ = require('underscore');
var Marionette = require('backbone.marionette');
var template = require('../template/SplashScreenView.tpl');
var VideoContainer = require('VideoContainer');
var App = require('App');

var SplashScreenView = Marionette.ItemView.extend({
	className: 'splash-view',
	template: _.template(template),

	initialize: function() {
		console.log('splash-view');
		this.videoSplash = new VideoContainer();
		this.videoSplash.setVideo('videos/splash', 1080, 1920);
		this.videoSplash.once('end', this.onVideoTutorialEnded.bind(this));
	},
	ui: {
		
	},
	ui: {
		videoWrapper: '#videoWrapper',
		button:'.button'
	},
	events: {
		'click @ui.button': 'onClickButton'
	},
	onClickButton:function() {
		console.log('launch tutorial');
		App.navigate('/intro',{trigger:true});
	},
	onRender:function() {
		this.ui.videoWrapper.append(this.videoSplash.el);
		// this.videoSplash.play();
	},
	onVideoTutorialEnded:function() {
		console.log('end')
	}

})


module.exports = SplashScreenView;