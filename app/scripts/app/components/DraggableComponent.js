var Const = require('Const');
var inherits = require('inherits');
var AbstractComponent = require('./AbstractComponent');
var Resources = require('Resources');


inherits(DraggableComponent, AbstractComponent);


function DraggableComponent(options) {
	AbstractComponent.call(this, options);
}

DraggableComponent.prototype.initialize = function(options) {
	// console.log('draggable')
	this.texturePath = 'images/western/skull/skull_1.png';
	AbstractComponent.prototype.initialize.call(this, options);

	this.graphic
		.on('mousedown', this.dragStart)
		.on('touchstart', this.dragStart)
		.on('mouseup', this.dragEnd)
		.on('mouseupoutside', this.dragEnd)
		.on('touchend', this.dragEnd)
		.on('touchendoutside', this.dragEnd)
		.on('mousemove', this.dragMove)
		.on('touchmove', this.dragMove);

}

DraggableComponent.prototype.dragStart = function(e) {
	if (!this.data && !this.identifier) {
		this.data = e.data;
		this.identifier = e.data.identifier;
		this.dragging = true;
		this.initialPosition = this.data.getLocalPosition(this);
	}
};

DraggableComponent.prototype.dragMove = function(e) {

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
		// e.stopPropagation();
	}
};

DraggableComponent.prototype.dragEnd = function(e) {
	if (e.data.identifier == this.identifier) {
		this.dragging = false;
		this.data = null;
		this.identifier = null;
	}
	
};



module.exports = DraggableComponent;