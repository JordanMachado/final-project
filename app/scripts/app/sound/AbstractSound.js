var PIXI = require('pixi.js')


/*
 *  AbstractSound
 */

'use stric';

function AbstractSound(options) {
	this.initialize.apply(this, arguments);
}

AbstractSound.prototype.initialize = function(options) {
	this.isPlaying = false;
	this.sound = new Audio(options.url);
	this.sound.addEventListener('ended', this.onEnded.bind(this));
	this.sound.loop = options.loop;
	if(options.volume)
		this.sound.volume = options.volume;
	if(options.maxVolume)
		this.sound.volume = options.maxVolume;
	// this.sound.volume = 0;
	// sound.play();
}

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
	this.isPlaying = false;
}



AbstractSound.prototype.reset = function() {
	console.log('reset sound');
}

module.exports = AbstractSound;