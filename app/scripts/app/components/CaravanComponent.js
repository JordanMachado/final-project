var Const = require('Const');
var inherits = require('inherits');
var AbstractComponent = require('./AbstractComponent');
var MovieClipComponent = require('./MovieClipComponent');
var Resources = require('Resources');
var MathFX = require('MathFX');
var TweenMax = require('gsap');
var _ = require('underscore');

inherits(CaravanComponent, AbstractComponent);


function CaravanComponent(options) {
	AbstractComponent.call(this, options);
}

CaravanComponent.prototype.initialize = function(options) {


	this.soundArgs = options.sound;


	this.graphic = new PIXI.Container(texture);
	this.graphic.position.x = options.x;
	this.graphic.position.y = options.y;


	// caravan
	var texture = PIXI.Texture.fromImage(this.texturePath);
	this.caravan = new PIXI.Sprite(texture);
	this.caravan.anchor.x = this.caravan.anchor.y = 0.5;
	this.graphic.addChild(this.caravan);

	// banjo man
	this.containerBanjoMan = new PIXI.Container();
	this.bandjoMan = new MovieClipComponent(options.movieClip);



	var mask = new PIXI.Graphics();
	mask.beginFill(0xFF3300);
	mask.lineStyle(0, 0x0000FF, 0);
	mask.drawRect(-this.caravan.width / 2, -this.caravan.height / 2, 450, this.caravan.height);


	this.containerBanjoMan.addChild(mask);
	this.containerBanjoMan.addChild(this.bandjoMan.graphic);
	this.containerBanjoMan.mask = mask;

	this.graphic.addChild(this.containerBanjoMan);

	this.caravan.interactive = true;
	this.caravan
		.on('mousedown', this.animate.bind(this))
		.on('touchstart', this.animate.bind(this))


	if (this.soundArgs)
		this.createSound();

	this.hitAreaTransparency = new PIXI.TransparencyHitArea.create(this.caravan)

}

CaravanComponent.prototype.animate = function(e) {

	var localposition = e.data.getLocalPosition(this.caravan)
	var positionX = localposition.x + (this.caravan.width / 2)
	var positionY = localposition.y + (this.caravan.height / 2)
	if (!this.hitAreaTransparency.isTextureTransparentAt(Math.floor(positionX), Math.floor(positionY))) {
		if (this.sound) {
			if (!this.sound.isPlaying)
				this.sound.play();
		}
		console.log('touch caravan')
		TweenLite.to(this.bandjoMan.graphic.position, 0.5, {
			x: -30
		});
		_.delay(function() {
			TweenLite.to(this.bandjoMan.graphic.position, 0.5, {
				x: 150
			});
		}.bind(this),7500)
	}

}

module.exports = CaravanComponent;