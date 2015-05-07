var Const = require('Const');
var inherits = require('inherits');
var AbstractComponent = require('./AbstractComponent');
var Resources = require('Resources');


inherits(RockComponent, AbstractComponent);


function RockComponent(options) {
	AbstractComponent.call(this, options);
}

RockComponent.prototype.initialize = function(options) {
	this.texturePath = Resources.datas.rock.url;
	AbstractComponent.prototype.initialize.call(this, options);

}

module.exports = RockComponent;