
var inherits = require('inherits');
var AbstractComponent = require('./AbstractComponent');
// var _ = require('underscore');

inherits(RockComponent,AbstractComponent);


function RockComponent(options) {
	console.log(options)
	AbstractComponent.call(this,options);
}


// console.log(AbstractComponent)
// var RockComponent = _.extend({
// 	initialize:function() {
// 		AbstractComponent.call(this);
// 		console.log('initialize  RockComponent')
// 	}

// },AbstractComponent);

// console.log(AbstractComponent.prototype)

module.exports = RockComponent;