var Const = require('Const');
var inherits = require('inherits');
var AbstractComponent = require('./AbstractComponent');

inherits(ButtonComponent, AbstractComponent);


function ButtonComponent(options) {
	AbstractComponent.call(this, options);
}

ButtonComponent.prototype.initialize = function(options) {

	this.hasAnimateCallBack = options.hasAnimateCallBack;
	this.callBackName = options.callBackName;
	this.callBackWaitingEnd = options.callBackWaitingEnd;
	
	this.soundArgs = options.sound;
	var textureOn = options.textures[0];
	var textureOff = options.textures[1];

	this.texture1 =  PIXI.Texture.fromImage(textureOn);
	this.texture2 = PIXI.Texture.fromImage(textureOff);
	this.currentTexture = this.texture1;

	this.graphic = new PIXI.Sprite(this.currentTexture);
	this.graphic.position.x = options.x;
	this.graphic.position.y = options.y;
	this.graphic.anchor.x = this.graphic.anchor.y = 0.5;

	this.graphic.interactive = true;
	this.graphic
		.on('mousedown', this.animate.bind(this))
		.on('touchstart', this.animate.bind(this))

	if (this.soundArgs)
		this.createSound();

}

ButtonComponent.prototype.animate = function() {
	this.currentTexture = (this.currentTexture === this.texture1) ? this.texture2:this.texture1;
	this.graphic.texture = this.currentTexture;
	AbstractComponent.prototype.animate.call(this);
}

module.exports = ButtonComponent;