var App = require('App');

/*
 * Module for managing VideoManager
 */

var Backbone = require('backbone');

var VideoManager = App.module('VideoManager', function(VideoManager, App) {
	VideoManager.startWithParent = true;
	var VideoManagerView = null;
	var VideoManagerView = require('./views/VideoManagerView');

	VideoManager.on('start', function() {
		console.log('VideoManager module start');
		var collection = new Backbone.Collection([{
			username: "Paul",
			active:false
		},{
			username: "Théo",
			active:false
		},
		{
			username: "Marine",
			active:false
		}])
		VideoManagerView = new VideoManagerView({
			collection: collection
		});
		App.videoManagerRegion.show(VideoManagerView);
		this.isShown = true;
		this.hideVideoManager();
	});

	VideoManager.showVideoManager = function() {
		if (this.isShown) return;
		App.videoManagerRegion.$el.show();
		this.isShown = true;


	};
	VideoManager.hideVideoManager = function() {

		if (!this.isShown) return;
		App.videoManagerRegion.$el.hide();
		this.isShown = false;
	};
});

module.exports = VideoManager;