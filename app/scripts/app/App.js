


// //helper
var helper = document.querySelector('.helper');
helper.style.display = 'none';


var Backbone = require('backbone');
Backbone.$ = require('jquery');
var Marionette = require('backbone.marionette');

var App = new Marionette.Application({
	getCurrentRoute: function() {
		return Backbone.history.fragment || null;
	},

	navigate: function(route, options) {
		options || (options = {});
		return Backbone.history.navigate(route, options);
	}
});

App.addRegions({
	mapRegion:'#map'
});

App.on('start', function(options) {
	
	if (Backbone.history) {
		Backbone.history.start();
	}
	console.log('App started')
});

App.addInitializer(function(options) {
	//call all modules
	require('./modules/map/Map');

});

var AppRouter = Backbone.Router.extend({
	routes: {
		'': 'index'
	}
});
App.router = new AppRouter();

App.router.on('route:index', function() {
	console.log('couczzefezfe')
});


var PIXI = require('pixi.js');
var MathFX = require('../utils/MathFX')


/* LOADER */
// var loader = PIXI.loader;
// loader
//     .add('images/map.jpg')
//     .load(onAssetsLoaded);

// function onAssetsLoaded() {
// 	init();
// }

// var renderer,
// 	stage,
// 	soundTest = {
// 		position:{
// 			x:500,
// 			y:500
// 		},
// 		distanceForPlaying:100,
// 		name:"cascade"
// 	},
// 	graphics;


// function init() {
// 	renderer = PIXI.autoDetectRenderer(window.innerWidth,window.innerHeight);
// 	document.body.appendChild(renderer.view);

// 	stage = new PIXI.Container();

// 	/* CONTAINER */
// 	var container = new PIXI.Container();
// 	container.interactive = true;
// 	container.buttonMode = true;
// 	container
// 		.on('mousedown', onDragStart)
// 		.on('touchstart', onDragStart)
// 		.on('mouseup', onDragEnd)
// 		.on('mouseupoutside', onDragEnd)
// 		.on('touchend', onDragEnd)
// 		.on('touchendoutside', onDragEnd)
// 		.on('mousemove', onDragMove)
// 		.on('touchmove', onDragMove);

// 	stage.addChild(container);

// 	/* MAP */
// 	var texture  = PIXI.Texture.fromImage('images/map.jpg');
// 	var map = new PIXI.Sprite(texture);
// 	map.interactive = true;
// 	map.on('mousedown',function(){
// 		console.log('mousedown map');
// 	});
// 	// not set anchor 0.5 easier for set position of other elements
// 	// map.anchor.x = map.anchor.y = 0.5;
// 	container.addChild(map);


// 	graphics = new PIXI.Graphics();
// 	graphics.lineStyle(2, 0xFF00FF, 1);
// 	graphics.beginFill(0xFF00BB, 0.25);
// 	graphics.drawCircle(soundTest.position.x,soundTest.position.y,6);
// 	graphics.endFill();
// 	window.graphics = graphics;
// 	container.addChild(graphics);



// 	//set initial position of the container
// 	container.position.x = window.innerWidth/2 - container.width/2;
// 	container.position.y = window.innerHeight/2 - container.height/2;

// 	container.spacing = {
// 		x:container.width-window.innerWidth,
// 		y:container.height-window.innerHeight
// 	}

// 	animate();
// }



// function animate() {
// 	requestAnimationFrame(animate);
// 	renderer.render(stage);
// }


// /* DRAG MAP FUNCTIONS */
// function onDragStart(event)
// {
//     this.data = event.data;
//     this.initialPosition = this.data.getLocalPosition(this);
//     this.dragging = true;
// }

// function onDragEnd()
// {
//     this.dragging = false;
//     this.data = null;
//     this.initialPosition = null;
// }

// function onDragMove()
// {
//     if (this.dragging)
//     {	

//     	// graphics get bounds it's a rect i have to substract the height and width by 2 for get an anchor of 0.5 an get more precision
//     	if(MathFX.distance(graphics.getBounds(),{x:window.innerWidth/2,y:window.innerHeight/2}) < soundTest.distanceForPlaying) {
//     		console.log('should play sound');
//     	}
//         var localPositionToStage = this.data.getLocalPosition(this.parent);

//         var newPosition = {
//         	x:localPositionToStage.x - this.initialPosition.x,
//         	y:localPositionToStage.y - this.initialPosition.y
//         } 
//    		// if the new position is in the bounding box define by the difference of the size window/container
//         if(newPosition.x < 0 && newPosition.x > -this.spacing.x){
// 			this.position.x = newPosition.x;
//         }
//         if(newPosition.y < 0 && newPosition.y > -this.spacing.y) {
// 			this.position.y = newPosition.y;
//         }
//     }
// }


module.exports = App;