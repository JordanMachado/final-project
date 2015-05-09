var App = require('App');

/*
 * Module for managing SplashScreen
 */

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
		this.hideSplashScreen();

	});

	SplashScreen.showSplashScreen = function() {
		if (this.isShown) return;
		App.splashRegion.$el.show();
		this.isShown = true;

	};
	SplashScreen.hideSplashScreen = function() {

		if (!this.isShown) return;
		App.splashRegion.$el.hide();
		this.isShown = false;
	};

});

module.exports = SplashScreen;