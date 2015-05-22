

// should create module for preloading
var $ =  require('jquery');
var App = require('./app/App');
var Resources = require('Resources');

window.DEBUG = false;

var main = {
	initialize:function() {
		$(document).ready(main.onReady);

	},
	onReady:function() {
		Resources.load(function(){
			// console.log(Resources)
			App.start({container:'#App'})
		});

	}
}

main.initialize();
