var Const = require('Const');
var inherits = require('inherits');
var AbstractComponent = require('./AbstractComponent');
var Resources = require('Resources');


inherits(MovieClipComponent, AbstractComponent);


function MovieClipComponent(options) {
	AbstractComponent.call(this, options);
}

MovieClipComponent.prototype.initialize = function(options) {
	this.textureName = options.textureName;
	this.texturePath = options.texturePath;
	this.numberOfFrame = options.numberOfFrame;
	this.loop = options.loop;



	this.textures = [];
	for (var i = 0, ln = this.numberOfFrame; i < ln; i++) {
		var texture = new PIXI.Texture.fromFrame(this.texturePath + this.textureName + i + '.png')
		this.textures.push(texture);
	}

	this.graphic = new PIXI.extras.MovieClip(this.textures);
	this.graphic.anchor.x = this.graphic.anchor.y = 0.5;
	//position
	this.graphic.position.x = options.x;
	this.graphic.position.y = options.y;
	//scale
	this.graphic.scale.x = options.scaleX || 1;
	this.graphic.scale.y = options.scaleY || 1;
	//animationSpeed
	this.graphic.animationSpeed = options.animationSpeed || 1;
	this.graphic.loop = this.loop;

	if (options.autoplay)
		this.graphic.play();


	if (options.interactive) {
		this.graphic.interactive = true;
		this.graphic
			.on('mousedown', this.animate.bind(this))
			.on('touchstart', this.animate.bind(this))

	}
}

MovieClipComponent.prototype.animate = function() {
	// AbstractComponent.prototype.animate.call(this);
	this.graphic.play();
}

module.exports = MovieClipComponent;