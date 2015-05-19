var Const = require('Const');
var inherits = require('inherits');
var AbstractComponent = require('./AbstractComponent');
var Resources = require('Resources');


inherits(MovieClipComponent, AbstractComponent);


function MovieClipComponent(options) {
	AbstractComponent.call(this, options);
};

MovieClipComponent.prototype.initialize = function(options) {
	this.textureName = options.textureName;
	this.texturePath = options.texturePath;
	this.numberOfFrame = options.numberOfFrame;
	this.loop = options.loop;
	this.reverse = options.reverse;
	this.autoplay = options.autoplay;
	this.interactive = options.interactive;


	this.texturesClockWise = [];
	for (var i = 0, ln = this.numberOfFrame; i < ln; i++) {
		var texture = new PIXI.Texture.fromFrame(this.texturePath + this.textureName + i + '.png')
		this.texturesClockWise.push(texture);
	}

	this.graphic = new PIXI.extras.MovieClip(this.texturesClockWise);
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

	if (this.reverse) {
		this.texturesCounterClockWise = [];
		for (var i = this.numberOfFrame, ln = this.numberOfFrame - 1; i > 0; i--) {
			var texture = new PIXI.Texture.fromFrame(this.texturePath + this.textureName + i + '.png')
			this.texturesCounterClockWise.push(texture);
		}
		this.clockWise = true;

		this.graphicReverse = new PIXI.extras.MovieClip(this.texturesCounterClockWise);
		this.graphicReverse.anchor.x = this.graphicReverse.anchor.y = 0.5;
		//position
		this.graphicReverse.position.x = options.x;
		this.graphicReverse.position.y = options.y;
		//scale
		this.graphicReverse.scale.x = options.scaleX || 1;
		this.graphicReverse.scale.y = options.scaleY || 1;
		//animationSpeed
		this.graphicReverse.animationSpeed = options.animationSpeed || 1;
		this.graphicReverse.loop = this.loop;

		this.graphicReverse.interactive = this.interactive;
		this.graphicReverse
			.on('mousedown', this.animate.bind(this))
			.on('touchstart', this.animate.bind(this))

		this.graphicReverse.alpha = 0;


	}

	if (this.autoplay)
		this.graphic.play();


	this.graphic.interactive = this.interactive;
	this.graphic
		.on('mousedown', this.animate.bind(this))
		.on('touchstart', this.animate.bind(this))

	this.soundArgs = options.sound;
	if (this.soundArgs)
		AbstractComponent.prototype.createSound.call(this);
};


MovieClipComponent.prototype.addToContainer = function(container) {
	this.mapContainer = container;
	container.addChild(this.graphic);
	if (this.reverse)
		container.addChild(this.graphicReverse);
}

MovieClipComponent.prototype.animate = function() {

	if(this.sound) {
		if(!this.sound.isPlaying)
		this.sound.play();
	}


	if (this.reverse) {
		if (this.clockWise) {
			this.graphicReverse.alpha = 0;
			this.graphic.alpha = 1;
			this.graphic.gotoAndPlay(0);
		} else {
			this.graphic.alpha = 0;
			this.graphicReverse.alpha = 1;
			this.graphicReverse.gotoAndPlay(0);
		}

		this.clockWise = !this.clockWise;

	} else {
		this.graphic.play();
	}

};



module.exports = MovieClipComponent;