var PIXI = require('pixi.js');
var MathFX = require('MathFX');

var inherits = require('inherits');
var AbstractSound = require('./AbstractSound');

inherits(ThreeDSound, AbstractSound);


function ThreeDSound(options) {
	AbstractSound.call(this, options);
}

ThreeDSound.prototype.initialize = function(options) {
	AbstractSound.prototype.initialize.call(this, options);
	this.zoneRadius = options.radius;


	if (DEBUG) {
		this.container = new PIXI.Container();
		this.visualisation = new PIXI.Graphics();
		this.visualisation.lineStyle(0);
		this.visualisation.beginFill(0xFF0000, 1);
		this.visualisation.drawCircle(options.x, options.y, 10);
		this.visualisation.endFill();
		this.visualisation.beginFill(0xFF00BB, 0.3);
		this.visualisation.drawCircle(options.x, options.y, this.zoneRadius);
		this.visualisation.endFill();

		this.container.addChild(this.visualisation);
		// console.log(this.container.width,this.container.height)
	}

}

ThreeDSound.prototype.addToContainer = function(container) {
	this.mapContainer = container;
	if(DEBUG)
		container.addChild(this.container);
}

ThreeDSound.prototype.checkPosition = function() {
	var bounds = this.container.getBounds();
	var position = {
		x:bounds.x+(bounds.width/2),
		y:bounds.y+(bounds.height/2)
	}

	var dist = MathFX.distance(position,{x:window.innerWidth/2,y:window.innerHeight/2})
	
	if(dist<this.zoneRadius) {
		this.sound.volume = Math.abs(dist/this.zoneRadius-1);	
	}
	if(dist<this.zoneRadius && !this.isPlaying) {
		this.play()
	} else if(dist>this.zoneRadius && this.isPlaying) {
		this.stop();
	}
}

module.exports = ThreeDSound;