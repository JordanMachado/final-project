var PIXI = require('pixi.js');
var spine = require('pixi-spine');
var resourcesData = require('../../../datas/resources.json');

var _instance = null;

function Resources() {
	if (_instance !== null) throw new Error("Cannot instantiate more than one Resources, use Resources.get_instance()");
	this.datas = null;
	this.loaded = false;
}

Resources.prototype.load = function(cb) {

	if(this.loaded) return;
	
	var loader = PIXI.loader;
	for (var i = 0, ln = resourcesData.datas.length; i < ln; i++) {
		loader.add(resourcesData.datas[i].name,resourcesData.datas[i].path);
	}
	loader.load(function(loader,datas){
		this.loaded = true;
		this.datas = datas;
		// console.log('loaded resources')
		if(cb)
			cb();
	}.bind(this));
}
Resources.get_instance = function() {
	if (_instance === null) {
		_instance = new Resources();
	}
	return _instance;
};

module.exports = Resources.get_instance();