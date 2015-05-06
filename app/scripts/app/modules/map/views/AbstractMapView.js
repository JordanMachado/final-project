var Backbone = require('backbone');
Backbone.$ = require('jquery');
var _ = require('underscore');
var Marionette = require('backbone.marionette');

var PIXI = require('pixi.js');
var spine = require('pixi-spine');
var ComponentFactory = require('./components/ComponentFactory');
var ThreeDSound = require('./sound/ThreeDSound');
var Resources = require('Resources');





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


	},
	createComponents: function() {


		var components = this.model.get('components');
		for(var i =0,ln = components.length;i<ln;i++) {
			
			var ComponentClass = ComponentFactory.build(components[i]);
			var component = new ComponentClass(components[i].config);
			component.addToContainer(this.container);
			this.components.push(component);
		}
		


	},
	createSounds:function() {
		console.log('createSounds')
		var sounds = this.model.get('sounds');

		for(var i =0,ln = sounds.length;i<ln;i++) {
			var sound = new ThreeDSound(sounds[i])
			sound.addToContainer(this.container);
			this.sounds.push(sound)
			console.log(sound)
		}

		this.createComponents();
	},
	animate: function() {
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


			// create test if object and if is object store the center of the triangle of the touches to set the initialposition
			if (e.data.originalEvent.touches.length == 3)
				this.dragging = true;
			else
				this.dragging = false;
		} else {
			this.dragging = true;
		}

		this.initialPosition = e.data.getLocalPosition(this);
	},
	onDragMoveContainer: function(e) {

		if (this.container.dragging) {

			// set localPositionToStage the center of the triangle of the touches 
			var localPositionToStage = e.data.getLocalPosition(this.container.parent);

			for(var i =0,ln = this.sounds.length;i<ln;i++) {
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
			if (e.data.originalEvent.touches.length != 3)
				this.dragging = false;
		} else {
			this.dragging = false;
		}

		this.initialPosition = null;
	}

});

module.exports = AbstractMapView;