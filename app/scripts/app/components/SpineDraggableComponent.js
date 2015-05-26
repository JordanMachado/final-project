

var Const = require('Const');
var inherits = require('inherits');
var AbstractComponent = require('./AbstractComponent');
var Resources = require('Resources');


inherits(SpineDraggable, AbstractComponent);


function SpineDraggable(options) {
	// AbstractComponent.call(this, options);
	this.initialize.apply(this, arguments);
}

SpineDraggable.prototype.initialize = function(options) {

	var spineData = null;
	this.type = options.spineData;
	switch (options.spineData) {
		case 'buffalo':
			spineData = Resources.datas.buffalo.spineData;
			break;
		case 'horse':
			spineData = Resources.datas.horse.spineData;
			break;
		default:
			spineData = Resources.datas.buffalo.spineData;
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

SpineDraggable.prototype.dragStart = function(e) {
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

SpineDraggable.prototype.dragMove = function(e) {
	
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


SpineDraggable.prototype.dragEnd = function(e) {
	// if (e.data.identifier == this.identifier) {
		console.log('drag end animal Component')
		this.state.setAnimationByName(1, "stable", true);
		this.dragging = false;
		this.data = null;
		this.identifier = null;

	// }

};



module.exports = SpineDraggable;