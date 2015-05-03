

// should create module for preloading

var $ =  require('jquery');
var App = require('./App/App');

window.DEBUG = true;

var main = {
	initialize:function() {
		$(document).ready(main.onReady);
	},
	onReady:function() {
		App.start({container:'#App',loader:'#loader'})
	}
}

main.initialize();
