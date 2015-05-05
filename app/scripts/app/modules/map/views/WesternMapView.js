

var AbstractMapView = require('./AbstractMapView');

var WesternMapView = AbstractMapView.extend({
	className: AbstractMapView.prototype.className+ '-western',
});

module.exports = WesternMapView;