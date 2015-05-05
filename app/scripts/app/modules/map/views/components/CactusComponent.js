var Const = require('Const');
var inherits = require('inherits');
var AbstractComponent = require('./AbstractComponent');
var Resources = require('Resources');

inherits(CactusComponent, AbstractComponent);


function CactusComponent(options) {
	AbstractComponent.call(this, options);
}

CactusComponent.prototype.initialize = function(options) {
	this.texturePath = Resources.datas.cactus.url;
	AbstractComponent.prototype.initialize.call(this, options);

}

CactusComponent.prototype.animate = function(options) {
	var tl = new TimelineLite();
	tl.to(this.graphic.scale, 0.5, {
		x: 0.8,
		y: 0.8,
		ease: Elastic.easeOut.config(1, 0.3)
	});
	tl.to(this.graphic.scale, 0.4, {
		x: 1,
		y: 1,
		ease: Elastic.easeOut.config(1, 0.3)
	}, '-=0.2');

}


module.exports = CactusComponent;