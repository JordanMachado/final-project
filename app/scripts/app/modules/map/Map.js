var App = require('../../App');
/*
 * Module for managing Map exercice
 */
var Map = App.module('Map',function(Map,App){
	Map.startWithParent = true;
	var mapView = null;

	Map.on('start',function(){
		console.log('Map module start');
		var WesternMapView = require('./views/WesternMapView');
		mapView = new WesternMapView();
		App.mapRegion.show(mapView);
	});
});

module.exports = Map;