

// should create module for preloading

var $ =  require('jquery');
var App = require('./app/App');

window.DEBUG = true;

var main = {
	initialize:function() {
		$(document).ready(main.onReady);
		console.log('OK TA MERE')
	},
	onReady:function() {
		App.start({container:'#App',loader:'#loader'})
	}
}

main.initialize();
