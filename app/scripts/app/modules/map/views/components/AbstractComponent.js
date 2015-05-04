var PIXI = require('pixi.js');

/*
 * Abstract Component
 */
function AbstractComponent(options) {
	console.log(options)
	console.log('initialize AbstractComponent');
	var texture = PIXI.Texture.fromImage('images/pierre.png');
	this.sprite = new PIXI.Sprite(texture);
	this.sprite.position.x = options.x;
	this.sprite.position.y = options.y;
	this.sprite.interactive = true;
	// var scale = Math.random();
	// this.sprite.scale = {x:scale,y:scale};
	window.sprite = this.sprite;
	this.sprite
		.on('mousedown',function() {
			console.log('mousedown')
		})

	
}

AbstractComponent.prototype.addToContainer = function(container) {
	container.addChild(this.sprite);
}

// console.log(AbstractComponent.prototype)
module.exports = AbstractComponent;