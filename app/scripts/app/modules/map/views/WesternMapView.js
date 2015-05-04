

var AbstractMapView = require('./AbstractMapView');

var WesternMapView = AbstractMapView.extend({
	className: AbstractMapView.prototype.className+ '-western',

	initialize:function(options) {
		console.log('initialized wester');
		AbstractMapView.prototype.initialize.call(this);
	}
});

module.exports = WesternMapView;