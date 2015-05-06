var Backbone = require('backbone');
Backbone.$ = require('jquery');
var _ = require('underscore');
var Marionette = require('backbone.marionette');

var CockPitView = Marionette.ItemView.extend({
	className: 'cockpit-view',
	template: _.template('<img src="images/cockpit/galaxie.png" alt="">'),

	initialize: function() {
		this.initializePIXI();

	},
	onShow: function() {
		this.$el.append(this.renderer.view);
		this.animate();
	},
	initializePIXI: function() {
		this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
			transparent: true
		});
		this.stage = new PIXI.Container();
		this.container = new PIXI.Container();
		this.stage.addChild(this.container);

		this.createStars();
	},
	createStars: function() {
		this.stars = [];
		for (var i = 0; i < 200; i++) {
			var star = new PIXI.Sprite.fromImage('images/cockpit/star.png');
			star.anchor.x = star.anchor.y = 0.5;
			star.position.x = Math.random()*window.innerWidth,
			star.position.y = Math.random()*window.innerHeight,
			star.initialScale = Math.random() * (0.6 - 0.2) + 0.2;
			star.scale.x = star.scale.y = star.initialScale;
			this.container.addChild(star);
			this.stars.push(star);

		}
		window.star=this.stars
		this.tick = 0;
	},
	animate: function() {
		this.tick+=0.2;
		for (var i = 0; i < 200; i++) {
			
			this.stars[i].scale.x = this.stars[i].scale.y = this.stars[i].initialScale + (Math.cos(this.tick+i)/25);
		}
		requestAnimationFrame(this.animate.bind(this));
		this.renderer.render(this.stage);
	}
})


module.exports = CockPitView;