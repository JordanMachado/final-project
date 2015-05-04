
// import all component class
var RockComponent = require('./RockComponent');

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
			default:
				return AbstractComponent;
		}
		
	}
}

module.exports = ComponentFactory;