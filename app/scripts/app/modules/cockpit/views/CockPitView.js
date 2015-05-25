var Backbone = require('backbone');
Backbone.$ = require('jquery');
var _ = require('underscore');
var Marionette = require('backbone.marionette');
var ComponentFactory = require('ComponentFactory');
var TweenMax = require('gsap');
var App = require('App');


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
		// this.renderer.render(this.stage);
	},
	initializePIXI: function() {
		this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
			transparent: true
		});
		this.stage = new PIXI.Container();
		this.container = new PIXI.Container();
		this.stage.addChild(this.container);

		this.createStars();
		this.createPlanets();
		this.createCockpit();
		this.createComponents();
		// this.hideElementsSpace();
		this.manettePressed = false;
		this.isInSpace = false;
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
		this.planets[0].setAnimateCallBack(this.onPlanetClicked.bind(this));
		this.tickPlanets = 0;

	},
	createCockpit: function() {
		var cockpit = new PIXI.Sprite.fromImage('images/cockpit/cockpit.png');
		this.container.addChild(cockpit);

	},
	onManettePressed: function(component) {
		if (this.manettePressed) return;
		this.manettePressed = true;
		console.log('onManettePressed', component)
		App.trigger('app:cockpitTakeOff');
		_.delay(function() {
			for (var i = 0, ln = this.components.length; i < ln; i++) {
				if (this.components[i] instanceof ComponentFactory.getComponentClass('movieclip') && this.components[i] !== component)
					TweenLite.to(this.components[i].graphic, 5, {
						animationSpeed: 1,
						ease: Quad.easeOut
					})
					// this.components[i].graphic.animationSpeed = 1;
			}
		}.bind(this), 2500);

		this.listenTo(App, 'app:cockpitTakeOffFinished', this.onVideoTakeOffEnded);
		_.delay(function() {
			for (var i = 0, ln = this.components.length; i < ln; i++) {
				if (this.components[i] instanceof ComponentFactory.getComponentClass('movieclip') && this.components[i] !== component)
					TweenLite.to(this.components[i].graphic, 2.5, {
						animationSpeed: 0.2,
						ease: Quad.easeOut
					})
					// this.components[i].graphic.animationSpeed = 0.2;
			}
		}.bind(this), 12000);
	},
	onPlanetClicked: function() {
		console.log('planets clicked')

		App.trigger('app:planetClicked')
		_.delay(function() {
			App.navigate('experience/map', {
				trigger: true
			});
		})
	},
	onVideoTakeOffEnded: function() {
		console.log('video end show planets !!!! mother fucker')
		this.isInSpace = true;
		this.showElementsSpace();
	},
	createComponents: function() {
		var components = this.model.get('components');
		for (var i = 0, ln = components.length; i < ln; i++) {
			var ComponentClass = ComponentFactory.build(components[i]);
			var component = new ComponentClass(components[i].config);
			component.addToContainer(this.container);
			if (component.hasAnimateCallBack) {
				var cb = null;
				switch (component.callBackName) {
					case 'takeoff':
						cb = this.onManettePressed.bind(this);
						break;
					default:
						cb = function() {
							console.warn('callback not defined')
						};
						break;
				}
				component.setAnimateCallBack(cb);
			}
			this.components.push(component);
		}
	},
	animate: function() {
		if (this.isInSpace)
			this.animateComponent();
		requestAnimationFrame(this.animate.bind(this));
		this.renderer.render(this.stage);
	},
	showElementsSpace: function() {
		console.log('show showElementsSpace')
		for (var i = 0, ln = this.stars.length; i < ln; i++) {
			this.stars[i].visible = true;
			this.stars[i].alpha = 0;
			TweenLite.to(this.stars[i], .5, {
				alpha: 1,
			});
		}
		for (var i = 0, ln = this.planets.length; i < ln; i++) {
			this.planets[i].graphic.visible = true;
			this.planets[i].graphic.alpha = 0;
			TweenLite.to(this.planets[i].graphic, .5, {
				alpha: 1
			});
		}
	},
	hideElementsSpace: function() {
		console.log('hide')
		for (var i = 0, ln = this.stars.length; i < ln; i++) {
			this.stars[i].visible = false;
		}
		for (var i = 0, ln = this.planets.length; i < ln; i++) {
			this.planets[i].graphic.visible = false;
		}

	},
	animateComponent: function() {
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
	}
})


module.exports = CockPitView;