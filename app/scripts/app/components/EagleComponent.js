var inherits = require('inherits');
var AbstractComponent = require('./AbstractComponent');
var Resources = require('Resources');

inherits(EagleComponent, AbstractComponent);

function EagleComponent(options) {
	AbstractComponent.call(this, options);
}

EagleComponent.prototype.initialize = function(options) {
	this.tick = 0;
	/* 
	 * Create eagle container and
	 */

	this.graphic = new PIXI.spine.Spine(Resources.datas.eagle.spineData);
	this.graphic.state.setAnimationByName(1, "stable", true);
	this.graphic.position.x = options.x;
	this.graphic.position.y = options.y;
	this.graphic.interactive = true;
	this.graphic
		.on('mousedown', function(){
			this.graphic.state.setAnimationByName(1, "envol", true);
			this.animate()
		}.bind(this))
		.on('touchstart', function(){
			this.graphic.state.setAnimationByName(1, "envol", true);
			this.animate()
		}.bind(this));
}

EagleComponent.prototype.animate = function(e) {
	this.tick+=0.1;
	this.raf = requestAnimationFrame(this.animate.bind(this));
	this.graphic.position.x = this.graphic.position.x  - 5;
	this.graphic.position.y = this.graphic.position.y  + (2.1*Math.cos(this.tick));
	if(this.graphic.x< -this.graphic.width || this.graphic.y< -this.graphic.height ) {
		window.cancelAnimationFrame(this.raf);
		this.mapContainer.removeChild(this.graphic);
	}
}

module.exports = EagleComponent;