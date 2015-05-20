var Const = require('Const');
var inherits = require('inherits');
var AbstractComponent = require('./AbstractComponent');
var Resources = require('Resources');
var MathFX = require('MathFX');


inherits(RockComponent, AbstractComponent);


function RockComponent(options) {
	AbstractComponent.call(this, options);
}

RockComponent.prototype.initialize = function(options) {
	this.texturePath = options.texturePath || Resources.datas.rock.url;
	AbstractComponent.prototype.initialize.call(this, options);
	this.hitAreaTransparency = new PIXI.TransparencyHitArea.create(this.graphic)

}

RockComponent.prototype.animate = function(e) {


	var localposition = e.data.getLocalPosition(this.graphic)
		// anchor to 0.5 so add the half width and height 
	var positionX = localposition.x + (this.graphic.width / 2)
	var positionY = localposition.y + (this.graphic.height / 2)
	if (!this.hitAreaTransparency.isTextureTransparentAt(Math.floor(positionX), Math.floor(positionY))) {
		var random =  MathFX.randomRange(0.4,1.3);
		var tl = new TimelineLite();
		tl.to(this.graphic.scale, 0.5, {
			x:random,
			y:random,
			ease: Bounce.easeOut
		});
		tl.to(this.graphic.scale,random, {
			x: 1,
			y: 1,
			ease: Elastic.easeOut.config(1, 0.3)
		}, '-=0.2');
	}
	// AbstractComponent.prototype.animate.call(this);

}

module.exports = RockComponent;