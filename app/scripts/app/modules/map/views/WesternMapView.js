var _ = require('underscore');
var AbstractMapView = require('./AbstractMapView');
var ComponentFactory = require('ComponentFactory');

var WesternMapView = AbstractMapView.extend({
	className: AbstractMapView.prototype.className + '-western',
	initialize: function() {
		AbstractMapView.prototype.initialize.call(this);
		window.westerMap = this;
	},
	onRender: function() {
		this.setMapPosition(-1900,-2165)
		// setInterval(this.createVulture.bind(this),35000);
	},
	createVulture: function() {
		console.log('createVulture');
		var vultureArgs = {
			type: 'vulture',
			config: {
				x:this.container.width + 40,
				y: Math.random()*this.container.height
			}
		};
		var ComponentClass = ComponentFactory.build(vultureArgs);
		var component = new ComponentClass(vultureArgs.config);
		component.addToContainer(this.container);
	}
});

module.exports = WesternMapView;