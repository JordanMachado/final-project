var PIXI = require('pixi.js')


/*
 *  AbstractSound
 */

'use stric';

function AbstractSound(options) {
	this.initialize.apply(this, arguments);
}

AbstractSound.prototype.initialize = function(options) {
	console.log('initialize sound');
	this.isPlaying = false;
	this.sound = new Audio('sounds/test.mp3');
	this.sound.addEventListener('ended', this.onEnded.bind(this));
	window.sound = this.sound;
	// sound.play();
}

//just for test
AbstractSound.prototype.addToContainer = function(container) {}

AbstractSound.prototype.play = function() {
	console.log('play sound');
	this.sound.play();
	this.isPlaying = true;

}

AbstractSound.prototype.pause = function() {
	console.log('pause sound');
	this.sound.pause();
	this.isPlaying = false;
}

AbstractSound.prototype.stop = function() {
	console.log('stop sound');
	this.sound.pause();
	this.sound.currentTime = 0;
	this.isPlaying = false;
}

AbstractSound.prototype.onEnded = function() {
	console.log('ended')
}



AbstractSound.prototype.reset = function() {
	console.log('reset sound');
}

module.exports = AbstractSound;