var Const = require('Const');
var inherits = require('inherits');
var AbstractComponent = require('./AbstractComponent');
var Resources = require('Resources');
var MathFX = require('MathFX');
inherits(CactusComponent, AbstractComponent);


function CactusComponent(options) {
	AbstractComponent.call(this, options);
}

CactusComponent.prototype.initialize = function(options) {
	this.texturePath = Resources.datas.cactus.url;
	AbstractComponent.prototype.initialize.call(this, options);
	this.hitAreaTransparency = new PIXI.TransparencyHitArea.create(this.graphic)

}

CactusComponent.prototype.animate = function(e) {


	var localposition = e.data.getLocalPosition(this.graphic)
		// anchor to 0.5 so add the half width and height 
	var positionX = localposition.x + (this.graphic.width / 2)
	var positionY = localposition.y + (this.graphic.height / 2)
	if (!this.hitAreaTransparency.isTextureTransparentAt(Math.floor(positionX), Math.floor(positionY))) {

		if (this.sound) {
			if (!this.sound.isPlaying)
				this.sound.play();
		}
		var random = MathFX.randomRange(0.7, 1.3);
		var tl = new TimelineLite();
		tl.to(this.graphic.scale, 0.5, {
			x: random,
			y: random,
			ease: Elastic.easeOut.config(1, 0.3)
		});
		tl.to(this.graphic.scale, random, {
			x: 1,
			y: 1,
			ease: Elastic.easeOut.config(1, 0.3)
		}, '-=0.2');
	}

}


module.exports = CactusComponent;