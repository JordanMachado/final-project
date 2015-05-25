var Backbone = require('backbone');
Backbone.$ = require('jquery');
var _ = require('underscore');
var Marionette = require('backbone.marionette');
var template = require('../template/SplashScreenView.tpl');
var ImageContainer = require('ImageContainer');
var App = require('App');

var SplashScreenView = Marionette.ItemView.extend({
	className: 'splash-view',
	template: _.template(template),

	initialize: function() {
		console.log('splash-view');
		this.imageSplash = new ImageContainer();
		this.imageSplash.setImage('images/splash/splash.jpg', 1080, 1920);
		this.imageSplash.once('end', this.onVideoTutorialEnded.bind(this));
	},
	ui: {
		
	},
	ui: {
		imageWrapper: '#imageWrapper',
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
		this.ui.imageWrapper.append(this.imageSplash.el);
	},
	onVideoTutorialEnded:function() {
		console.log('end')
	}

})


module.exports = SplashScreenView;