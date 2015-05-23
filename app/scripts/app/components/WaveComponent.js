var Const = require('Const');
var inherits = require('inherits');
var MovieClipComponent = require('./MovieClipComponent');
var Resources = require('Resources');
var TweenMax = require('gsap');
var MathFX = require('MathFX');
var _ = require('underscore');


inherits(WaveComponent, MovieClipComponent);


function WaveComponent(options) {
	MovieClipComponent.call(this, options);
}

WaveComponent.prototype.initialize = function(options) {
	MovieClipComponent.prototype.initialize.call(this, options);
	this.graphic.scale.x = this.graphic.scale.y = MathFX.randomRange(0.3,1);
	this.random = MathFX.randomRange(6,12);
	setInterval(function(){ this.animate(); }.bind(this), this.random*1000);
	
	// setInterval(function(){ this.animate(); }.bind(this), 1000);
}


WaveComponent.prototype.animate = function(options) {
	var tl = new TimelineLite();
	var halftime = this.random/2;
	tl.to(this.graphic, halftime, {
		alpha:1,
		ease:Sine.easeOut,
	});
	tl.to(this.graphic, halftime, {
		alpha:0,
		ease:Sine.easeIn,
		onComplete:function(){
			var x = this.graphic.position.x + (Math.random()*20);
			var y = this.graphic.position.y + (Math.random()*20);
			this.graphic.position.x  = x;
			this.graphic.position.y = y;
			this.graphic.scale.x = this.graphic.scale.y = MathFX.randomRange(0.3,1);
		}.bind(this)
	}, '-=0.1');	

}
module.exports = WaveComponent;