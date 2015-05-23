var Const = require('Const');
var inherits = require('inherits');
var AbstractComponent = require('./AbstractComponent');
var Resources = require('Resources');
var PIXI = require('pixi.js');
var TransparencyHitArea = require('TransparencyHitArea');



inherits(SimpleComponent, AbstractComponent);


function SimpleComponent(options) {
	AbstractComponent.call(this, options);
}

SimpleComponent.prototype.initialize = function(options) {
	AbstractComponent.prototype.initialize.call(this, options);
	this.graphic.interactive = options.interactive || false;
	this.hitAreaTransparency = new PIXI.TransparencyHitArea.create(this.graphic)

	if (DEBUG) {
		this.testContainer = new PIXI.Container();
		this.testContainer.position.x = options.x;
		this.testContainer.position.y = options.y;
	}


}

SimpleComponent.prototype.addToContainer = function(container) {
	this.mapContainer = container;
	container.addChild(this.graphic);
	if (DEBUG)
		container.addChild(this.testContainer);
}

SimpleComponent.prototype.animate = function(e) {
	
	var localposition = e.data.getLocalPosition(this.graphic)
		// anchor to 0.5 so add the half width and height 
	var positionX = localposition.x + (this.graphic.width / 2)
	var positionY = localposition.y + (this.graphic.height / 2)
	if (DEBUG) {
		var visualisation = new PIXI.Graphics();
		visualisation.lineStyle(0);
		visualisation.beginFill(0xFF0000, 1);
		visualisation.drawCircle(0, 0, 5);
		visualisation.position.x = localposition.x
		visualisation.position.y = localposition.y
		this.testContainer.addChild(visualisation);
	}

	if (!this.hitAreaTransparency.isTextureTransparentAt(Math.floor(positionX), Math.floor(positionY)))
		AbstractComponent.prototype.animate.call(this)
}



module.exports = SimpleComponent;