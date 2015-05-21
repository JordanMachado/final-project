var Backbone = require('backbone');
Backbone.$ = require('jquery');
var _ = require('underscore');
var Marionette = require('backbone.marionette');
var ComponentFactory = require('ComponentFactory');

var CockPitView = Marionette.ItemView.extend({
	className: 'cockpit-view',
	template: _.template(''),

	initialize: function() {
		this.components = [];
		this.planets = [];
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
			star.position.x = Math.random() * window.innerWidth;
			star.position.y = Math.random() * window.innerHeight;
			star.initialScale = Math.random() * (0.6 - 0.2) + 0.2;
			star.scale.x = star.scale.y = star.initialScale;
			this.container.addChild(star);
			this.stars.push(star);
		}
		this.tickStarts = 0;

		this.createPlanets();
	},
	createPlanets: function() {
		var planets = this.model.get('planets');

		for (var i = 0, ln = planets.length; i < ln; i++) {
			var ComponentClass = ComponentFactory.build(planets[i]);
			var planet = new ComponentClass(planets[i].config);
			planet.addToContainer(this.container);
			this.planets.push(planet);
		}
		this.planets[0].inverse = true;
		this.tickPlanets = 0;
		this.createCockpit();
	},
	createCockpit: function() {
		var cockpit = new PIXI.Sprite.fromImage('images/cockpit/cockpit.png');
		this.container.addChild(cockpit);
		this.createComponents();
	},
	createComponents: function() {
		console.log('createComponents')

		var components = this.model.get('components');
		for (var i = 0, ln = components.length; i < ln; i++) {
			var ComponentClass = ComponentFactory.build(components[i]);
			var component = new ComponentClass(components[i].config);
			component.addToContainer(this.container);
			this.components.push(component);
		}
	},
	animate: function() {
		this.tickStarts += 0.2;
		this.tickPlanets += 0.02;
		for (var i = 0, ln = this.stars.length; i < ln; i++) {
			this.stars[i].scale.x = this.stars[i].scale.y = this.stars[i].initialScale + (Math.cos(this.tickStarts + i) / 25);
		}
		for (var i = 0, ln = this.planets.length; i < ln; i++) {
			var x = Math.cos(this.tickPlanets + i) * 5;
			var y = Math.sin(this.tickPlanets + i) * 5;

			var _tick = (this.planets[i].inverse) ? -this.tickPlanets : this.tickPlanets;

			this.planets[i].graphic.position.x = this.planets[i].initialPosition.x + x;
			this.planets[i].graphic.position.y = this.planets[i].initialPosition.y + y;
		}
		requestAnimationFrame(this.animate.bind(this));
		this.renderer.render(this.stage);
	}
})


module.exports = CockPitView;