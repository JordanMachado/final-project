	'use strict';

	console.log('Marionette shim');
	var Backbone = require('backbone');
	Backbone.$ = require('jquery');
	var Marionette = require('backbone.marionette');
	window.Marionette = Marionette;
