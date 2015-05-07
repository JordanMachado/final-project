
// import all component class

//common component
var AbstractComponent = require('./AbstractComponent');
var FishComponent = require('./FishComponent');

// wester component
var RockComponent = require('./RockComponent');
var CactusComponent = require('./CactusComponent');
var EagleComponent = require('./EagleComponent');

//cockpit components
var PlanetComponent = require('./PlanetComponent');
var ButtonComponent = require('./ButtonComponent');
var WaveComponent = require('./WaveComponent');

var ComponentFactory = {
	build:function(options) {
		return ComponentFactory.getComponentClass(options.type)
	},
	getComponentClass:function(type) {
		switch(type) {
			case 'rock':
				return RockComponent;
			break;
			case 'wave':
				return WaveComponent;
			break;
			case 'button':
				return ButtonComponent;
			break;
			case 'planet':
				return PlanetComponent;
			break;
			case 'cactus':
				return CactusComponent;
			break;
			case 'eagle':
				return EagleComponent;
			break;
			case 'fish':
				return FishComponent;
			default:
				return AbstractComponent;
		}
		
	}
}

module.exports = ComponentFactory;