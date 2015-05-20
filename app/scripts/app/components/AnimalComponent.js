// var inherits = require('inherits');
// var DraggableComponent = require('./DraggableComponent');
// var Resources = require('Resources');

// inherits(AnimalComponent, DraggableComponent);

// function AnimalComponent(options) {
// 	DraggableComponent.call(this, options);
// }

// // AnimalComponent.prototype.initialize = function(options) {
// 	// console.log('Animal Component');

// 	// var spineData = null;
// 	// switch (options.spineData) {
// 	// 	case 'buffalo':
// 	// 		var spineData = Resources.datas.buffalo.spineData;
// 	// 		break;
// 	// 	case 'horse':
// 	// 		var spineData = Resources.datas.horse.spineData;
// 	// 		break;
// 	// 	case 'snake':
// 	// 		var spineData = Resources.datas.buffalo.spineData;
// 	// 		break;
// 	// 	default:
// 	// 		var spineData = Resources.datas.buffalo.spineData;
// 	// 		break;
// 	// }
// 	// this.graphic = new PIXI.spine.Spine(spineData);
// 	// this.graphic.state.setAnimationByName(1, "stable", true);
// 	// this.graphic.position.x = options.x;
// 	// this.graphic.position.y = options.y;
// 	// this.graphic.interactive = true;
// 	// this.graphic
// 	// 	.on('mousedown', this.dragStart)
// 	// 	.on('touchstart', this.dragStart)

// 	// 	.on('mouseup', this.dragEnd)
// 	// 	.on('mouseupoutside', this.dragEnd)
// 	// 	.on('touchend', this.dragEnd)
// 	// 	.on('touchendoutside', this.dragEnd)

// 	// 	.on('mousemove', this.dragMove)
// 	// 	.on('touchmove', this.dragMove);



// // }

// // AnimalComponent.prototype.dragStart = function(e) {


// // 	DraggableComponent.prototype.dragStart.call(this, e);

// // 	if (e.data.identifier == this.identifier) {
// // 		this.state.setAnimationByName(1, "drag", true);
// // 	}
// // }

// // AnimalComponent.prototype.dragEnd = function(e) {

// // 	DraggableComponent.prototype.dragEnd.call(this, e);

// // 	if (e.data.identifier == this.identifier) {
// // 		console.log('dragEnd')
// // 		this.state.setAnimationByName(1, "stable", true);
// // 		this.identifier = null;
// // 	}

// // }


// AnimalComponent.prototype.animate = function(e) {}

// module.exports = AnimalComponent;


var Const = require('Const');
var inherits = require('inherits');
var AbstractComponent = require('./AbstractComponent');
var Resources = require('Resources');


inherits(AnimalComponent, AbstractComponent);


function AnimalComponent(options) {
	// AbstractComponent.call(this, options);
	this.initialize.apply(this, arguments);
}

AnimalComponent.prototype.initialize = function(options) {

	var spineData = null;
	switch (options.spineData) {
		case 'buffalo':
			var spineData = Resources.datas.buffalo.spineData;
			break;
		case 'horse':
			var spineData = Resources.datas.horse.spineData;
			break;
		case 'snake':
			var spineData = Resources.datas.buffalo.spineData;
			break;
		default:
			var spineData = Resources.datas.buffalo.spineData;
			break;
	}
	this.graphic = new PIXI.spine.Spine(spineData);
	this.graphic.state.setAnimationByName(1, "stable", true);
	this.graphic.position.x = options.x;
	this.graphic.position.y = options.y;
	this.graphic.interactive = true;



	this.graphic
		.on('mousedown', this.dragStart.bind(this))
		.on('touchstart', this.dragStart.bind(this))
		.on('mouseup', this.dragEnd)
		.on('mouseupoutside', this.dragEnd)
		.on('touchend', this.dragEnd)
		.on('touchendoutside', this.dragEnd)
		.on('mousemove', this.dragMove)
		.on('touchmove', this.dragMove);

}

/*
 *
 */

AnimalComponent.prototype.dragStart = function(e) {
	console.log('drag start animal')
	// this.mapContainer.interactive = false;
	if (!this.graphic.data && !this.graphic.identifier) {
		this.graphic.data = e.data;
		this.graphic.identifier = e.data.identifier;
		this.graphic.dragging = true;
		this.graphic.initialPosition = this.graphic.data.getLocalPosition(this.graphic);
		this.graphic.state.setAnimationByName(1, "drag", true);

		
	}
};

AnimalComponent.prototype.dragMove = function(e) {
	
	if (this.dragging) {

		if (e.data.identifier == this.identifier) {
			var localPositionToContainer = this.data.getLocalPosition(this.parent);
			var newPosition = {
				x: localPositionToContainer.x - this.initialPosition.x,
				y: localPositionToContainer.y - this.initialPosition.y
			}
			this.position.x = newPosition.x;
			this.position.y = newPosition.y;
			
		}
		
		// e.stopped = true;
	}
};


AnimalComponent.prototype.dragEnd = function(e) {
	// if (e.data.identifier == this.identifier) {
		console.log('drag end animal Component')
		this.state.setAnimationByName(1, "stable", true);
		this.dragging = false;
		this.data = null;
		this.identifier = null;

	// }

};



module.exports = AnimalComponent;