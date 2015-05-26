var Const = require('Const');
var inherits = require('inherits');
var AbstractComponent = require('./AbstractComponent');
var Resources = require('Resources');
var MathFX = require('MathFX');



inherits(CowboyComponent, AbstractComponent);


function CowboyComponent(options) {
	// AbstractComponent.call(this, options);
	this.initialize.apply(this, arguments);
}

CowboyComponent.prototype.initialize = function(options) {

	this.hasAnimateCallBack = options.hasAnimateCallBack;
	this.callBackName = options.callBackName;
	this.callBackWaitingEnd = options.callBackWaitingEnd;

	var spineData = Resources.datas.cowboy.spineData;
	this.graphic = new PIXI.spine.Spine(spineData);
	this.graphic.state.setAnimationByName(1, "stable", true);
	this.graphic.position.x = options.x;
	this.graphic.position.y = options.y;
	this.graphic.interactive = true;

	this.step = 0;



	this.graphic
		.on('mousedown', this.dragStart.bind(this))
		.on('touchstart', this.dragStart.bind(this))
		.on('mouseup', this.dragEnd)
		.on('mouseupoutside', this.dragEnd.bind(this))
		.on('touchend', this.dragEnd.bind(this))
		.on('touchendoutside', this.dragEnd.bind(this))
		.on('mousemove', this.dragMove)
		.on('touchmove', this.dragMove);


}

CowboyComponent.prototype.addToContainer = function(container) {

	AbstractComponent.prototype.addToContainer.call(this, container);
	this.createDropZone();
}

CowboyComponent.prototype.createDropZone = function() {
	this.dropzones = [{
		x: 2200,
		y: 2400,
		radius: 500
	},{
		x: 2000,
		y: 1400,
		radius: 500
	}]

	this.horseEnclosure = new PIXI.Sprite.fromImage('images/western/cheval.png')
	this.horseEnclosure.anchor.x = this.horseEnclosure.anchor.y = 0.5;
	this.horseEnclosure.position.x = 1950;
	this.horseEnclosure.position.y = 2400;
	this.mapContainer.addChild(this.horseEnclosure);
};
CowboyComponent.prototype.dragStart = function(e) {
	console.log('drag start animal')
		// this.mapContainer.interactive = false;
	if (!this.graphic.data && !this.graphic.identifier) {
		this.graphic.data = e.data;
		this.graphic.identifier = e.data.identifier;
		this.graphic.dragging = true;
		this.graphic.initialPosition = this.graphic.data.getLocalPosition(this.graphic);

		if (this.step == 0)
			this.graphic.state.setAnimationByName(1, "drag", true);


	}
};

CowboyComponent.prototype.dragMove = function(e) {

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


CowboyComponent.prototype.dragEnd = function(e) {
	console.log('drag end animal Component')
	if (this.step == 0)
		this.graphic.state.setAnimationByName(1, "stable", true);
	
	this.graphic.dragging = false;
	this.graphic.data = null;
	this.graphic.identifier = null;
	if (this.step <= 1) {
		if (MathFX.distance(this.dropzones[this.step], this.graphic) < this.dropzones[this.step].radius) {
			this.updateState();
		}
	}

};

CowboyComponent.prototype.updateState = function() {

	switch (this.step) {
		case 0:
			var position = this.graphic.position;
			this.mapContainer.removeChild(this.horseEnclosure);
			this.mapContainer.removeChild(this.graphic);
			this.graphic = new PIXI.Sprite.fromImage('images/western/cheval+cowboy.png');
			this.graphic.position.x = 2160;
			this.graphic.position.y = 2240;
			this.mapContainer.addChild(this.graphic);
			this.graphic.interactive = true;
			this.graphic
				.on('mousedown', this.dragStart.bind(this))
				.on('touchstart', this.dragStart.bind(this))
				.on('mouseup', this.dragEnd)
				.on('mouseupoutside', this.dragEnd.bind(this))
				.on('touchend', this.dragEnd.bind(this))
				.on('touchendoutside', this.dragEnd.bind(this))
				.on('mousemove', this.dragMove)
				.on('touchmove', this.dragMove);

			break;
		case 1:
			this.graphic.position.x = 1450;
			this.graphic.position.y = 880;
			this.graphic.interactive = false;
			break;
		case 2:
			break;
	}
	this.animateCallBack(this);

	this.step += 1;

}



module.exports = CowboyComponent;