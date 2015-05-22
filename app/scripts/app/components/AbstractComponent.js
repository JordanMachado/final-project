var PIXI = require('pixi.js');
var TransparencyHitArea = require('TransparencyHitArea');
var TweenMax = require('gsap');
var Const = require('Const');
var Sound = require('Sound');



/*
 * Abstract Component
 */

'use stric';

function AbstractComponent(options) {
	this.texturePath = options.texturePath || "images/western/rock.png";
	this.initialize.apply(this, arguments);


}

AbstractComponent.prototype.initialize = function(options) {

	var texture = PIXI.Texture.fromImage(this.texturePath);
	this.soundArgs = options.sound;
	this.hasAnimateCallBack = options.hasAnimateCallBack;
	this.callBackName = options.callBackName;
	this.callBackWaitingEnd = options.callBackWaitingEnd;

	this.graphic = new PIXI.Sprite(texture);
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


AbstractComponent.prototype.addToContainer = function(container) {
	this.mapContainer = container;
	this.mapContainer.addChild(this.graphic)
}

AbstractComponent.prototype.setAnimateCallBack = function(cb) {
	this.animateCallBack = cb;

}

AbstractComponent.prototype.createSound = function() {
	console.log('createSound');
	this.sound = new Sound(this.soundArgs);
};

AbstractComponent.prototype.animate = function() {
	if (this.sound) {
		if (!this.sound.isPlaying)
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
		ease: Elastic.easeOut.config(1, 0.3),
		onComplete: function() {
			if (this.animateCallBack && this.callBackWaitingEnd === true) {
				this.animateCallBack(this);
			}
		}.bind(this)
	}, '-=0.2');

	if (this.animateCallBack && this.callBackWaitingEnd === false) {
		this.animateCallBack(this);
	}
}

module.exports = AbstractComponent;