var TweenMax = require('gsap');
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

		this.maxVolume = options.maxVolume || options.volume;
	
	// this.sound.volume = 0
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
AbstractSound.prototype.fadeIn = function(cb) {
	this.sound.volume = 0;
	this.play();
	console.log(this.maxVolume)
	TweenLite.to(this.sound,1,{
		volume:this.maxVolume,
		onComplete:function(){

			if(cb)
				cb();
		}
	})
	this.isPlaying = false;
}
AbstractSound.prototype.fadeOut = function(cb) {
	TweenLite.to(this.sound,1,{
		volume:0,
		onComplete:function(){

			if(cb)
				cb();
		}
	})
	this.isPlaying = false;
}


AbstractSound.prototype.kill = function() {
	delete this.sound;
	delete this.isPlaying;
	delete this;
}

module.exports = AbstractSound;