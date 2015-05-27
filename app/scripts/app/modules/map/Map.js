var App = require('App');

/*
 * Module for managing Map exercice
 */

// var datas = require('../../../../datas/test.json');
var datas = require('../../../../datas/western.json');

var Backbone = require('backbone');

var Map = App.module('Map', function(Map, App) {
	Map.startWithParent = true;
	var mapView = null;

	Map.on('start', function() {
		console.log('Map module start');
		var WesternMapView = require('./views/WesternMapView');
		mapView = new WesternMapView({
			model: new Backbone.Model(datas)
		});
		
	});

	Map.fadeIn = function() {
		App.experienceRegion.show(mapView);
		// set z-index to 1 for the set the video manager on top
		App.experienceRegion.$el.css('z-index','1');
		TweenLite.to(App.experienceRegion.$el,1.5,{
			autoAlpha:1,
			ease:Quad.easeOut
		})
	};
});

module.exports = Map;