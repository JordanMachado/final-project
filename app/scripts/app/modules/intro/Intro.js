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
		var collection = new Backbone.Collection([{
			username: "Paul",
			active:false
		},{
			username: "Théo",
			active:false
		},
		{
			username: "Marine",
			active:false
		}])
		IntroView = new IntroView({
			collection: collection
		});
		App.introRegion.show(IntroView);
		this.isShown = true;
		this.hideIntro();
	});

	Intro.showIntro = function() {
		if (this.isShown) return;
		App.introRegion.$el.show();
		this.isShown = true;


	};
	Intro.hideIntro = function() {

		if (!this.isShown) return;
		App.introRegion.$el.hide();
		this.isShown = false;
	};
});

module.exports = Intro;