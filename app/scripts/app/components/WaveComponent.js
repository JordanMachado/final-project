var Const = require('Const');
var inherits = require('inherits');
var AbstractComponent = require('./AbstractComponent');
var Resources = require('Resources');
var TweenMax = require('gsap');


inherits(RockComponent, AbstractComponent);


function RockComponent(options) {
	AbstractComponent.call(this, options);
}

RockComponent.prototype.initialize = function(options) {
	this.texturePath = "images/cockpit/vague.png";
	AbstractComponent.prototype.initialize.call(this, options);
	this.graphic.alpha = 0;
	console.log(this.graphic.z)
	setInterval(function(){ this.animate(); }.bind(this), 6000);
	

}


RockComponent.prototype.animate = function(options) {
	var tl = new TimelineLite();
	tl.to(this.graphic, 1.5, {
		alpha:1,
		ease:Sine.easeOut
	});
	tl.to(this.graphic, 1, {
		alpha:0,
		ease:Sine.easeIn
	}, '-=0.1');	

}
module.exports = RockComponent;