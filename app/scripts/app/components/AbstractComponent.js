var PIXI = require('pixi.js');

var TweenMax = require('gsap');
var Const = require('Const');
var Sound = require('Sound');



/*
 * Abstract Component
 */

'use stric';

function AbstractComponent(options) {
	this.texturePath = "images/western/rock.png";
	this.initialize.apply(this, arguments);
}

AbstractComponent.prototype.initialize = function(options) {
	var texture = PIXI.Texture.fromImage(this.texturePath);

	this.soundArgs = options.sound;

	this.graphic = new PIXI.Sprite(texture);
	this.graphic.position.x = options.x;
	this.graphic.position.y = options.y;
	this.graphic.anchor.x = this.graphic.anchor.y = 0.5;

	this.graphic.interactive = true;
	this.graphic
		.on('mousedown', this.animate.bind(this))
		.on('touchstart', this.animate.bind(this))

	if(this.soundArgs)
		this.createSound();
}


AbstractComponent.prototype.addToContainer = function(container) {
	this.mapContainer = container;
	container.addChild(this.graphic);
}

AbstractComponent.prototype.createSound = function() {
	console.log('createSound');
	this.sound = new Sound(this.soundArgs);
};

AbstractComponent.prototype.animate = function() {

	if(this.sound) {
		if(!this.sound.isPlaying)
		this.sound.play();
	}

	var tl = new TimelineLite();
	tl.to(this.graphic.scale, 0.5, {
		x: 0.7,
		y: 0.7,
		ease: Bounce.easeOut
	});
	tl.to(this.graphic.scale, 0.4, {
		x: 1,
		y: 1,
		ease: Elastic.easeOut.config(1, 0.3)
	}, '-=0.2');
}

module.exports = AbstractComponent;