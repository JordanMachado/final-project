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

	this.soundArgs = options.sound;
	var textureStable = options.textures[0];
	var textureDrag = options.textures[1];

	this.texture1 = PIXI.Texture.fromImage(textureStable);
	this.texture2 = PIXI.Texture.fromImage(textureDrag);
	this.soundArgs = options.sound;
	this.hasAnimateCallBack = options.hasAnimateCallBack;
	this.callBackName = options.callBackName;
	this.callBackWaitingEnd = options.callBackWaitingEnd;

	this.graphic = new PIXI.Sprite(this.texture1);
	this.graphic.position.x = options.x;
	this.graphic.position.y = options.y;
	this.graphic.anchor.x = this.graphic.anchor.y = 0.5;

	this.graphic.interactive = true;
	if (this.soundArgs)
		this.createSound();

	this.graphic
		.on('mousedown', this.dragStart.bind(this))
		.on('touchstart', this.dragStart.bind(this))
		.on('mouseup', this.dragEnd.bind(this))
		.on('mouseupoutside', this.dragEnd.bind(this))
		.on('touchend', this.dragEnd.bind(this))
		.on('touchendoutside', this.dragEnd.bind(this))
		.on('mousemove', this.dragMove)
		.on('touchmove', this.dragMove);



}

DraggableComponent.prototype.dragStart = function(e) {
	if (!this.graphic.data && !this.graphic.identifier) {
		if (this.sound) {
			if (!this.sound.isPlaying)
				this.sound.play();
		}
		this.graphic.data = e.data;
		this.graphic.identifier = e.data.identifier;
		this.graphic.dragging = true;
		this.graphic.initialPosition = this.graphic.data.getLocalPosition(this.graphic);
		this.graphic.texture = this.texture2;
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
	if (e.data.identifier == this.graphic.identifier) {
		this.graphic.dragging = false;
		this.graphic.data = null;
		this.graphic.identifier = null;
		this.graphic.texture = this.texture1;
	}

};



module.exports = DraggableComponent;