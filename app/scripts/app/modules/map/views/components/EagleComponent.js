var inherits = require('inherits');
var AbstractComponent = require('./AbstractComponent');
var Resources = require('Resources');

inherits(EagleComponent, AbstractComponent);

function EagleComponent(options) {
	AbstractComponent.call(this, options);
}

EagleComponent.prototype.initialize = function(options) {

	console.log('EagleComponent')
	/* 
	 * Create fish container and
	 */

	this.graphic = new PIXI.Container();


	this.animation = new PIXI.spine.Spine(Resources.datas.eagle.spineData);
	this.animation.state.setAnimationByName(1, "stable", true);
	this.graphic.addChild(this.animation);

	this.graphic.position.x = options.x;
	this.graphic.position.y = options.y;



	this.graphic.interactive = true;
	this.graphic
		.on('mousedown', function(){
			this.animation.state.setAnimationByName(1, "envol", true);
			this.animate()
		}.bind(this));

		// var tick  = new PIXI.ticker.Ticker();
		// tick.addEventListener('update',function(){
		// 	console.log('yo')
		// })
	
		// tick.start();
}

EagleComponent.prototype.animate = function(e) {
	this.raf = requestAnimationFrame(this.animate.bind(this));
	this.graphic.position.x = this.graphic.position.x  -4;
	var date = Date.now();

	this.graphic.position.y = this.graphic.position.y  + 2*Math.cos(date);
	if(this.graphic.x< -this.graphic.width || this.graphic.y< -this.graphic.height ) {
		window.cancelAnimationFrame(this.raf);
		this.mapContainer.removeChild(this.graphic);
	}
}

module.exports = EagleComponent;