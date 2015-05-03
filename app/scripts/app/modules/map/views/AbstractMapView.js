

var Backbone = require('backbone');
Backbone.$ = require('jquery');
var _ = require('underscore');
var PIXI = require('pixi.js');

var Marionette = require('backbone.marionette');



var AbstractMapView = Marionette.ItemView.extend({
	className: 'map-view',
	univers: '',
	template:_.template(""),

	initialize:function() {
		// temporary load in abstract but have to load all assets during the launch of the application
		var loader = PIXI.loader;
		loader
    		.add('images/map.jpg')
    		.load(this.onAssetsLoaded.bind(this));
	},
	onAssetsLoaded:function() {
		this.initializePIXI();
		this.$el.append(this.renderer.view);
		this.animate();
	},

	onRender:function() {},
	onShow:function() {

	},
	// initialize the pixi scene
	initializePIXI: function() {
		this.renderer = PIXI.autoDetectRenderer(window.innerWidth,window.innerHeight);
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
			.on('mousemove', this.onDragMoveContainer)
			.on('touchmove', this.onDragMoveContainer);


		this.stage.addChild(this.container);

		this.createComponents();
		
	},
	createComponents: function() {
		/* MAP */
		var texture  = PIXI.Texture.fromImage('images/map'+this.univers+'.jpg');
		var map = new PIXI.Sprite(texture);
		this.container.addChild(map);
		
		// set container position and determine spacing for drag
		this.container.position.x = window.innerWidth/2 - this.container.width/2;
		this.container.position.y = window.innerHeight/2 - this.container.height/2;

		this.container.spacing = {
			x:this.container.width-window.innerWidth,
			y:this.container.height-window.innerHeight
		}

	},
	animate:function() {
		requestAnimationFrame(this.animate.bind(this));
		this.renderer.render(this.stage);
	},
	/*
	 * Container events
	 */ 
	onDragStartContainer:function(e) {
		//same value e.data.originalEvent && e.Data.getLocalPosition
		// console.log(e.data.originalEvent.touches[0].clientX,e.data.originalEvent.touches[0].clientY)
		// console.log(e.data.getLocalPosition(this.parent))
		if(!DEBUG) {


			// create test if object and if is object store the center of the triangle of the touches to set the initialposition
			if(e.data.originalEvent.touches.length== 3)
				this.dragging = true;
			else
				this.dragging = false;
		} else {
			   this.dragging = true;
		}
		
		this.initialPosition = e.data.getLocalPosition(this);
	},
	onDragMoveContainer:function(e) {
		
		if(this.dragging) {
			// set localPositionToStage the center of the triangle of the touches 
			var localPositionToStage = e.data.getLocalPosition(this.parent);

			var newPosition = {
				x:localPositionToStage.x - this.initialPosition.x,
				y:localPositionToStage.y - this.initialPosition.y
			} 
			// if the new position is in the bounding box define by the difference of the size window/container
			if(newPosition.x < 0 && newPosition.x > -this.spacing.x){
				this.position.x = newPosition.x;
			}
			if(newPosition.y < 0 && newPosition.y > -this.spacing.y) {
				this.position.y = newPosition.y;
			}

		}
	},
	onDragEndContainer:function(e) {
		if(!DEBUG) {
			if(e.data.originalEvent.touches.length != 3)
				this.dragging = false;
		} else {
			this.dragging = false;
		}

		this.initialPosition = null;
	}

});

module.exports = AbstractMapView;