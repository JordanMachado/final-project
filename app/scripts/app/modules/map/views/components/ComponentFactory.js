
// import all component class


var ComponentFactory = {
	build:function(options) {

	},
	getComponentClass:function(options) {
		switch(option.truc) {
			case 'rock':
				return RockComponent
			break;
			case 'cactus':
				return CactusComponent
			default:
				return AbstractComponent;
		}
		
	}
}

module.exports = ComponentFactory;