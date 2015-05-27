var Backbone = require('backbone');
Backbone.$ = require('jquery');
var _ = require('underscore');
var Marionette = require('backbone.marionette');
var template = require('../template/AvatarView.tpl');
var TweenMax = require('gsap');
var App = require('App');

var AvatarView = Marionette.ItemView.extend({
	className: 'avatar-view',
	template: _.template(template),
	ui: {
		hallo: '.hallo'
	},
	events: {
		'touchstart': 'onTouch',
		'touchend': 'onTouch'
	},
	initialize:function() {
		this.interactive = false;
	},
	modelEvents: {
		"change": "modelChanged"
	},
	onTouch: function(e) {
		if(!this.interactive) return;
		var touch = 1;
		console.log(e.originalEvent.touches.length)
		if (e.originalEvent.touches.length >= touch) {
			this.model.set('active', true)
		} else {
			this.model.set('active', false)
		}
	},
	modelChanged: function() {
		if (this.model.get('active') == true) {
			this.triggerMethod('avatar:stateChange',{active:true});
			this.showHallo();
		} else {
			this.triggerMethod('avatar:stateChange',{active:false});
			this.hideHallo();
		}
	},
	showHallo: function() {
		TweenMax.to(this.ui.hallo, 2, {
			opacity: 1,
			repeat: -1,
			ease: Quad.easeOut,
			yoyo: true
		})
	},
	hideHallo: function() {
		TweenLite.to(this.ui.hallo, 0.5, {
			opacity: 0,
			ease: Quad.easeOut
		})
	},
	toogleInteractivity:function() {
		this.interactive = !this.interactive;
	}

})

module.exports = AvatarView;