
// import all component class
var RockComponent = require('./RockComponent');
var FishComponent = require('./FishComponent');
var CactusComponent = require('./CactusComponent');
var EagleComponent = require('./EagleComponent');

var ComponentFactory = {
	build:function(options) {
		return ComponentFactory.getComponentClass(options.type)
	},
	getComponentClass:function(type) {
		switch(type) {
			case 'rock':
				return RockComponent;
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