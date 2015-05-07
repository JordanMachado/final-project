var Const = require('Const');
var inherits = require('inherits');
var AbstractComponent = require('./AbstractComponent');

inherits(PlanetComponent, AbstractComponent);


function PlanetComponent(options) {
	AbstractComponent.call(this, options);
}

PlanetComponent.prototype.initialize = function(options) {
	this.texturePath = options.url;
	this.initialPosition = {
		x:options.x,
		y:options.y
	}
	AbstractComponent.prototype.initialize.call(this, options);

}

module.exports = PlanetComponent;