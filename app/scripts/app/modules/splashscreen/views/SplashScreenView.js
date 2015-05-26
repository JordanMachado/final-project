var Backbone = require('backbone');
Backbone.$ = require('jquery');
var _ = require('underscore');
var Marionette = require('backbone.marionette');
var template = require('../template/SplashScreenView.tpl');
var ImageContainer = require('ImageContainer');
var App = require('App');
var Sound = require('Sound');

var SplashScreenView = Marionette.ItemView.extend({
	className: 'splash-view',
	template: _.template(template),

	initialize: function() {
		console.log('splash-view');
		this.imageSplash = new ImageContainer();
		this.imageSplash.setImage('images/splash/splash.jpg', 1080, 1920);

		this.sound = new Sound({
			url: "sounds/intro/ambiance-space.mp3",
			loop: true,
			volume: 0.3,
			maxVolume: 0.3
		});
	},
	ui: {
		imageWrapper: '#imageWrapper',
		button: '.button'
	},
	events: {
		'click @ui.button': 'onClickButton'
	},
	onClickButton: function() {
		console.log('launch tutorial');
		this.sound.fadeOut(function(){
			this.sound.kill()
		}.bind(this));
		App.navigate('/intro', {
			trigger: true
		});

	},
	onRender: function() {
		this.ui.imageWrapper.append(this.imageSplash.el);
		this.sound.fadeIn();
	}

})


module.exports = SplashScreenView;