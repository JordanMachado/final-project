

var AbstractMapView = require('./AbstractMapView');
var WesternMapView = AbstractMapView.extend({
	className: AbstractMapView.prototype.className+ '-western',

	initialize:function() {
		console.log('initialized wester');
		AbstractMapView.prototype.initialize.call(this);
	}
});

module.exports = WesternMapView;