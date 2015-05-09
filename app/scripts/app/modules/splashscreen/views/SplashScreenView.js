var Backbone = require('backbone');
Backbone.$ = require('jquery');
var _ = require('underscore');
var Marionette = require('backbone.marionette');
var template = require('../template/SplashScreenView.tpl')
var App = require('App');

var SplashScreenView = Marionette.ItemView.extend({
	className: 'splash-view',
	template: _.template(template),

	initialize: function() {
		console.log('splash-view')
	},
	ui: {
		button:'.button'
	},
	events: {
		'click @ui.button': 'onClickButton'
	},
	onClickButton:function() {
		console.log('click');
		App.navigate('/map');
	}

})


module.exports = SplashScreenView;