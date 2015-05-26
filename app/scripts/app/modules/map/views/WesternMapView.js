var _ = require('underscore');
var AbstractMapView = require('./AbstractMapView');
var ComponentFactory = require('ComponentFactory');
var Sound = require('Sound')

var WesternMapView = AbstractMapView.extend({
	className: AbstractMapView.prototype.className + '-western',
	initialize: function() {
		AbstractMapView.prototype.initialize.call(this);
		window.westerMap = this;
	},
	onRender: function() {
		this.setMapPosition(-1870, -2160)
		this.canDrag = false;
		setInterval(this.createVulture.bind(this),35000);
	},
	createVulture: function() {
		console.log('createVulture');
		var vultureArgs = {
			type: 'vulture',
			config: {
				x: this.container.width + 40,
				y: Math.random() * this.container.height
			}
		};
		var ComponentClass = ComponentFactory.build(vultureArgs);
		var component = new ComponentClass(vultureArgs.config);
		component.addToContainer(this.container);
	},
	createComponents: function()  {

		// no much time so i do this ...
		var components = this.model.get('components');
		for (var i = 0, ln = components.length; i < ln; i++) {
			var ComponentClass = ComponentFactory.build(components[i]);
			var component = new ComponentClass(components[i].config);
			component.addToContainer(this.container);
			if (component.hasAnimateCallBack) {
				var cb = null;
				switch (component.callBackName) {
					case 'cowboyupdate':
						cb = this.cowboyUpdateState.bind(this);
						break;
					default:
						cb = function() {
							console.warn('callback not defined')
						};
						break;
				}
				component.setAnimateCallBack(cb);
			}
			this.components.push(component);
		}
	},
	cowboyUpdateState: function(cowboy) {
		console.log('cowboy')


		switch (cowboy.step)  {
			case 0:
				this.cowboySound = new Sound({
					url: "sounds/western/consigne2.mp3",
					loop: false,
					volume: 0.3
				});
				this.cowboySound.play();
				this.goToMapPosition(-1510, -700)
				break;
			case 1:
				this.cowboySound = new Sound({
					url: "sounds/western/consigne3.mp3",
					loop: false,
					volume: 0.3
				});
				this.cowboySound.play();
				this.goToMapPosition(-1270, 0)
				this.canDrag = true;
				break;
		}
	}
});


module.exports = WesternMapView;