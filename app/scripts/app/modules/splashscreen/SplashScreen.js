var App = require('App');

/*
 * Module for managing SplashScreen
 */
var TweenMax = require('gsap')
var Backbone = require('backbone');

var SplashScreen = App.module('SplashScreen', function(SplashScreen, App) {
	SplashScreen.startWithParent = true;
	var splashScreenView = null;
	var SplashScreenView = require('./views/SplashScreenView');

	SplashScreen.on('start', function() {
		console.log('SplashScreen module start');
		splashScreenView = new SplashScreenView();
		App.splashRegion.show(splashScreenView);
		this.isShown = true;
		this.hide();

	});

	SplashScreen.show = function() {
		if (this.isShown) return;
		App.splashRegion.$el.show();
		this.isShown = true;

	};
	SplashScreen.hide= function() {

		if (!this.isShown) return;
		App.splashRegion.$el.hide();
		this.isShown = false;
	};
	SplashScreen.fadeOut = function() {

		if (!this.isShown) return;
		TweenLite.to(App.splashRegion.$el,.5,{
			autoAlpha:0
		});
		this.isShown = false;
	};
	SplashScreen.reset = function() {
		console.log('reset splashScreenView')
		App.splashRegion.reset();
	};


	SplashScreen.listenTo(App,'app:startTutorial',SplashScreen.reset)

});

module.exports = SplashScreen;