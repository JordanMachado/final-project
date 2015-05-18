var inherits = require('inherits');
var DraggableComponent = require('./DraggableComponent');
var Resources = require('Resources');

inherits(AnimalComponent, DraggableComponent);

function AnimalComponent(options) {
	DraggableComponent.call(this, options);
}

AnimalComponent.prototype.initialize = function(options) {
	console.log('Animal Component');

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
		.on('mousedown', this.dragStart)
		.on('touchstart', this.dragStart)
		.on('mouseup', this.dragEnd)
		.on('mouseupoutside', this.dragEnd)
		.on('touchend', this.dragEnd)
		.on('touchendoutside', this.dragEnd)
		.on('mousemove', this.dragMove)
		.on('touchmove', this.dragMove);



}

AnimalComponent.prototype.dragStart = function(e) {
	DraggableComponent.prototype.dragStart.call(this, e);
	this.state.setAnimationByName(1, "drag", true);
}

AnimalComponent.prototype.dragEnd = function(e) {
	DraggableComponent.prototype.dragEnd.call(this, e);
	this.state.setAnimationByName(1, "stable", true);
}


AnimalComponent.prototype.animate = function(e) {}

module.exports = AnimalComponent;