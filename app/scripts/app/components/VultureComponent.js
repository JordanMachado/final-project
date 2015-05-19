var Const = require('Const');
var inherits = require('inherits');
var AbstractComponent = require('./AbstractComponent');
var Resources = require('Resources');


inherits(VultureComponent, AbstractComponent);


function VultureComponent(options) {
	AbstractComponent.call(this, options);
}

VultureComponent.prototype.initialize = function(options) {
	this.texturePath = Resources.datas.vulture.url;
	AbstractComponent.prototype.initialize.call(this, options);
	this.tick = 0;
	this.animate();

}

VultureComponent.prototype.animate = function(e) {
	this.tick+=0.01;
	this.raf = requestAnimationFrame(this.animate.bind(this));
	this.graphic.position.x = this.graphic.position.x  - 3;
	this.graphic.position.y = this.graphic.position.y  + (2*Math.cos(this.tick));
	this.graphic.rotation = 0.3*Math.cos(this.tick)
	if(this.graphic.x< -(this.graphic.width*2)|| this.graphic.y< -(this.graphic.height*2) ) {
		window.cancelAnimationFrame(this.raf);
		this.mapContainer.removeChild(this.graphic);
		console.log('kill')
	}
}

module.exports = VultureComponent;