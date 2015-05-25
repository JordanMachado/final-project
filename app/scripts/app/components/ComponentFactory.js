// import all component class

//common component
var AbstractComponent = require('./AbstractComponent');
var MovieClipComponent = require('./MovieClipComponent');
var ButtonComponent = require('./ButtonComponent');
var DraggableComponent = require('./DraggableComponent');
var SimpleComponent = require('./SimpleComponent');


// wester component
var RockComponent = require('./RockComponent');
var CactusComponent = require('./CactusComponent');
var EagleComponent = require('./EagleComponent');
var FishComponent = require('./FishComponent');
var SpineDraggable = require('./SpineDraggableComponent');
var VultureComponent = require('./VultureComponent');
var CaravanComponent = require('./CaravanComponent');

//cockpit components
var PlanetComponent = require('./PlanetComponent');
var WaveComponent = require('./WaveComponent');

var ComponentFactory = {
	build: function(options) {
		return ComponentFactory.getComponentClass(options.type)
	},
	getComponentClass: function(type) {
		switch (type) {
			case 'rock':
				return RockComponent;
				break;
			case 'vulture':
				return VultureComponent;
				break;
			case 'draggable':
				return DraggableComponent;
			case 'spineDraggable':
				return SpineDraggable;
				break;
			case 'movieclip':
				return MovieClipComponent;
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
			case 'fish':
				return FishComponent;
			case 'simple':
				return SimpleComponent;
				break;
			case 'caravan':
				return CaravanComponent;
				break;
			default:
				return AbstractComponent;
				break;
		}

	}
}

module.exports = ComponentFactory;