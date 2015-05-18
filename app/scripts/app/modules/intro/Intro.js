var App = require('App');

/*
 * Module for managing Intro
 */

var Backbone = require('backbone');

var Intro = App.module('Intro', function(Intro, App) {
	Intro.startWithParent = true;
	var IntroView = null;
	var IntroView = require('./views/IntroView');

	Intro.on('start', function() {
		console.log('Intro module start');
		IntroView = new IntroView();
		App.introRegion.show(IntroView);
	});
});

module.exports = Intro;