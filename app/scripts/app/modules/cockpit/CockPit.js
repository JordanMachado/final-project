var App = require('../../App');

/*
 * Module for managing CockPit 
 */

var datas = require('../../../../datas/cockpit.json');
var Backbone = require('backbone');

var CockPit = App.module('CockPit', function(CockPit, App) {
	CockPit.startWithParent = true;
	var cockPitView = null;

	CockPit.on('start', function() {
		console.log('CockPit module start');
		var CockPitView = require('./views/CockPitView');
		cockPitView = new CockPitView({
			model: new Backbone.Model(datas)
		});
		App.cockPitRegion.show(cockPitView);
	});
});

module.exports = CockPit;