var App = require('App');
var TweenMax = require('gsap');
/*
 * Module for managing CockPit
 */

var datas = require('../../../../datas/cockpit.json');
var Backbone = require('backbone');

var CockPit = App.module('CockPit', function(CockPit, App) {
	CockPit.startWithParent = true;
	var cockPitView = null;
	var CockPitView = require('./views/CockPitView');

	CockPit.on('start', function() {
		console.log('CockPit module start');
		cockPitView = new CockPitView({
			model: new Backbone.Model(datas)
		});
		App.experienceRegion.show(cockPitView);
		this.isShown = true;
		this.hide();

	});

	CockPit.show = function() {
		if (this.isShown) return;
		TweenLite.set(App.experienceRegion.$el,{
			autoAlpha:1
		})
		this.isShown = true;
		// console.log('show cockPitView')

	};
	CockPit.fadeIn = function() {
		if (this.isShown) return;
		TweenLite.to(App.experienceRegion.$el,1.5,{
			autoAlpha:1,
			ease:Quad.easeOut
		})
		this.isShown = true;
		// console.log('show cockPitView')

	};
	CockPit.fadeOut = function() {
		if (!this.isShown) return;
		TweenLite.to(App.experienceRegion.$el,.5,{
			autoAlpha:0,
			ease:Quad.easeOut
		})
		this.isShown = false;
		// console.log('fadeOut cockPitView')

	};
	CockPit.hide = function() {
		if (!this.isShown) return;
		TweenLite.set(App.experienceRegion.$el,{
			autoAlpha:0
		})
	
		this.isShown = false;
	};


	CockPit.listenTo(App, 'app:startCockpit', CockPit.fadeIn);
});

module.exports = CockPit;