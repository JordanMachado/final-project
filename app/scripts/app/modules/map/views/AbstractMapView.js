var Backbone = require('backbone');
Backbone.$ = require('jquery');
var _ = require('underscore');
var Marionette = require('backbone.marionette');

var PIXI = require('pixi.js');
var spine = require('pixi-spine');
var ComponentFactory = require('ComponentFactory');
var ThreeDSound = require('ThreeDSound');
var Sound = require('Sound');
var Resources = require('Resources');
var MathFX = require('MathFX');
var TweenMax = require('gsap');


var AbstractMapView = Marionette.ItemView.extend({
	className: 'map-view',
	univers: '',
	template: _.template(''),

	initialize: function() {
		this.components = [];
		this.sounds = [];

		this.animation = new PIXI.spine.Spine(Resources.datas.fishBlue.spineData);
		this.initializePIXI();


	},
	onRender: function() {},
	onShow: function() {
		this.$el.append(this.renderer.view);
		this.animate();


	},
	// initialize the pixi scene
	initializePIXI: function() {
		this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
		// console.log(this.renderer.type == PIXI.WEBGL_RENDERER)
		var type = (this.renderer instanceof PIXI.WebGLRenderer) ? 'webgl render' : 'canvas render'
		console.log(type);
		this.stage = new PIXI.Container();

		// container
		this.container = new PIXI.Container();
		this.container.interactive = true;
		this.container
			.on('mousedown', this.onDragStartContainer)
			.on('touchstart', this.onDragStartContainer)
			.on('mouseup', this.onDragEndContainer)
			.on('mouseupoutside', this.onDragEndContainer)
			.on('touchend', this.onDragEndContainer)
			.on('touchendoutside', this.onDragEndContainer)
			.on('mousemove', this.onDragMoveContainer.bind(this))
			.on('touchmove', this.onDragMoveContainer.bind(this));


		this.stage.addChild(this.container);

		this.createMap();

	},
	createMap: function() {
		/* MAP */
		var texture = PIXI.Texture.fromImage(Resources.datas.mapView.url);
		var map = new PIXI.Sprite(texture);
		this.container.addChild(map);

		// set container position and determine spacing for drag
		this.container.position.x = window.innerWidth / 2 - this.container.width / 2;
		this.container.position.y = window.innerHeight / 2 - this.container.height / 2;

		this.container.spacing = {
			x: this.container.width - window.innerWidth,
			y: this.container.height - window.innerHeight
		}

		this.createSounds();
		this.createComponents();
		this.createExtras();
		

	},
	createComponents: function() {


		var components = this.model.get('components');
		for (var i = 0, ln = components.length; i < ln; i++) {

			var ComponentClass = ComponentFactory.build(components[i]);
			var component = new ComponentClass(components[i].config);
			component.addToContainer(this.container);
			this.components.push(component);
		}



	},
	createSounds: function() {
		console.log('createSounds')
		var sounds = this.model.get('sounds');

		for (var i = 0, ln = sounds.length; i < ln; i++) {
			var sound = new ThreeDSound(sounds[i])
			sound.addToContainer(this.container);
			this.sounds.push(sound)
		}
		var backgroundSoundArgs = this.model.get('backgroundSound');
		this.backgroundSound = new Sound(backgroundSoundArgs);
		this.backgroundSound.play();

	},
	createExtras: function() {
		console.log('extras')
		// var extras = this.model.get('extras');

		// for (var i = 0, ln = extras.length; i < ln; i++) {
		// 	var extras = new ThreeDSound(sounds[i])
		// 	sound.addToContainer(this.container);
		// 	this.extras.push(sound)
		// }
	},
	animate: function(e) {
		requestAnimationFrame(this.animate.bind(this));
		this.renderer.render(this.stage);
		
	},
	/*
	 * Container events
	 */
	onDragStartContainer: function(e) {
		//same value e.data.originalEvent && e.Data.getLocalPosition
		// console.log(e.data.originalEvent.touches[0].clientX,e.data.originalEvent.touches[0].clientY)
		// console.log(e.data.getLocalPosition(this.parent))

		if (!DEBUG) {
			if (!this.dragging) {
				var objectInformation = AbstractMapView.prototype.objectDetection.call(this, e.data.originalEvent.touches);
				if (objectInformation.dragging == true) {
					this.initialPosition = e.data.getLocalPosition(this, objectInformation.positionCenter);
					this.dragging = true;

				}

			}

		} else {
			this.dragging = true;
			this.initialPosition = e.data.getLocalPosition(this);
		}


	},
	objectDetection: function(touches) {

		var dragging = false;
		var positionCenter = {};

		// set matchs to 0 for all touchs
		for (var i = 0, ln = touches.length; i < ln; i++) {
			touches[i].matchs = 0;
			for (var j = 0, ln = touches.length; j < ln; j++) {
				// compute all dist between touchs
				if (touches[i] !== touches[j]) {
					var coord1 = {
						x: touches[i].clientX,
						y: touches[i].clientY
					};
					var coord2 = {
						x: touches[j].clientX,
						y: touches[j].clientY
					};
					var dist = MathFX.distance(coord1, coord2);

					// dist match with pattern of the object
					if (dist > 60 && dist < 80) {
						touches[i].matchs = touches[i].matchs + 1;
					}
				}
			}
		}

		var objectTouches = [];
		// add all touchs of the object in objectTouches
		for (var i = 0, ln = touches.length; i < ln; i++) {
			if (touches[i].matchs == 2)
				objectTouches.push(touches[i]);
		}

		// set drag to true if detect pattern
		if (objectTouches.length == 3) {
			dragging = true;
			positionCenter.x = (objectTouches[0].clientX + objectTouches[1].clientX + objectTouches[2].clientX) / 3;
			positionCenter.y = (objectTouches[0].clientY + objectTouches[1].clientY + objectTouches[2].clientY) / 3;

		} else {
			dragging = false;
		}

		return {
			dragging: dragging,
			positionCenter: positionCenter
		}

	},
	onDragMoveContainer: function(e) {
		if (this.container.dragging) {

			if (!DEBUG) {
				var objectInformation = AbstractMapView.prototype.objectDetection.call(this, e.data.originalEvent.touches);
				var localPositionToStage = objectInformation.positionCenter;
			} else {
				var localPositionToStage = e.data.getLocalPosition(this.container.parent);
			}

			for (var i = 0, ln = this.sounds.length; i < ln; i++) {
				this.sounds[i].checkPosition()
			}

			var newPosition = {
					x: localPositionToStage.x - this.container.initialPosition.x,
					y: localPositionToStage.y - this.container.initialPosition.y
				}
				// if the new position is in the bounding box define by the difference of the size window/container
			if (newPosition.x < 0 && newPosition.x > -this.container.spacing.x) {
				this.container.position.x = newPosition.x;
			}
			if (newPosition.y < 0 && newPosition.y > -this.container.spacing.y) {
				this.container.position.y = newPosition.y;
			}

		}
	},
	onDragEndContainer: function(e) {
		if (!DEBUG) {
			var objectInformation = AbstractMapView.prototype.objectDetection.call(this, e.data.originalEvent.touches);
			if (objectInformation.dragging == false) {
				this.dragging = false;
				this.initialPosition = null;
			}
		} else {
			this.dragging = false;
		}

	},
	updateLayersOrder: function() {
		this.stage.children.sort(function(a, b) {
			a.zIndex = a.zIndex || 0;
			b.zIndex = b.zIndex || 0;
			return b.zIndex - a.zIndex
		});
	},
	setMapPosition: function(x, y) {
		console.log('set map ')
			// 1s -> 400px
			// x -> 600px

		var dist = MathFX.distance(this.container.position, {
			x: x,
			y: y
		});
		// 1s 500px
		var time = dist / 500;



		TweenLite.to(this.container.position, time, {
			x: x,
			y: y,
			ease: Quad.easeOut
		});
	}

});

module.exports = AbstractMapView;