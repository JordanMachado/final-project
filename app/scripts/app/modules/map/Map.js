var App = require('../../App');

/*
 * Module for managing Map exercice
 */

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
		App.mapRegion.show(mapView);
	});
});

module.exports = Map;