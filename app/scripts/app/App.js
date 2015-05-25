var Backbone = require('backbone');
Backbone.$ = require('jquery');
var Marionette = require('backbone.marionette');
var _ = require('underscore');
var TweenMax = require('gsap');

// //helper
var helper = document.querySelector('.helper');
helper.style.display = 'none';



var App = new Marionette.Application({
	getCurrentRoute: function() {
		return Backbone.history.fragment || null;
	},

	navigate: function(route, options) {
		options || (options = {});
		return Backbone.history.navigate(route, options);
	}
});

App.addRegions({
	splashRegion: '#splash',
	videoManagerRegion: '#intro',
	experienceRegion: '#experience'
});

App.splashRegion.on("before:swap", function(view, region, options) {
	console.log('swapp')
});

App.on('start', function(options) {

	this.loader = document.querySelector(options.loader)
	console.log(this.loader);

	if (Backbone.history) {
		Backbone.history.start();
	}
	_.delay(function() {
		TweenLite.to(this.loader, 0.5, {
			autoAlpha: 0
		});
	}.bind(this), 1000);

	console.log('App started')
});

App.addInitializer(function(options) {
	//call all modules
	require('./modules/splashscreen/SplashScreen');
	require('./modules/videoManager/VideoManager');
	require('./modules/cockpit/CockPit');
	require('./modules/map/Map');


});

var AppRouter = Backbone.Router.extend({
	routes: {
		'': 'index',
		'intro': 'intro',
		'experience/cockpit': 'cockpit',
		'experience/map': 'map',
		'experience/map/:id': 'mapWithId'
	}
});
App.router = new AppRouter();

App.router.on('route:index', function() {
	// console.log('index')

	App.SplashScreen.show();
});

App.router.on('route:intro', function() {
	// console.log('intro + tutorial')
	App.SplashScreen.fadeOut();
	App.VideoManager.showVideoManager();
	App.trigger('app:startTutorial')


});

App.router.on('route:cockpit', function() {
	if (DEBUG)
		App.CockPit.fadeIn()
});

App.router.on('route:map', function() {


	// _.delay(function(){
	// 	App.CockPit.fadeOut();

	// },3500);
	// _.delay(function(){
	// 	App.Map.fadeIn();	
	// },5000);

	if (DEBUG) {
		App.Map.fadeIn();
	}

});


window.app = App;

module.exports = App;