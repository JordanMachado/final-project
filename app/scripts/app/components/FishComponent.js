var inherits = require('inherits');
var AbstractComponent = require('./AbstractComponent');
var Resources = require('Resources');

inherits(FishComponent, AbstractComponent);

var animationNames = [
	"jump-01",
	"jump-02"
];
var animationFish = [
	Resources.datas.fishBlue.spineData,
	Resources.datas.fishGreen.spineData,
	Resources.datas.fishPink.spineData


];

function FishComponent(options) {
	AbstractComponent.call(this, options);
}

FishComponent.prototype.initialize = function(options) {

	/*
	 * Define the touch zone water
	 */
	this.soundArgs = options.sound;
	this.graphic = new PIXI.Container();
	//hit area
	this.graphic.hitArea = new PIXI.Polygon([
		new PIXI.Point(0, 1500),
		new PIXI.Point(500, 1800),
		new PIXI.Point(700, 2300),
		new PIXI.Point(1100, 2800),
		new PIXI.Point(1900, 3700),
		new PIXI.Point(0, 5800)
	]);
	if (this.soundArgs)
		this.createSound();

	this.fishs = [];
	this.graphic.interactive = true;
	this.graphic
		.on('mousedown',this.createFish.bind(this))
		.on('touchstart', this.createFish.bind(this))


}


FishComponent.prototype.createFish = function(e) {

	if (this.soundArgs)
		this.createSound();

		this.sound.play();


	var containerAnim = new PIXI.Container();
	var fish = new PIXI.Container();
	var fishAnimation = new PIXI.spine.Spine(animationFish[Math.floor(Math.random() * animationFish.length)]);
	fish.addChild(fishAnimation)

	fishAnimation.state.setAnimationByName(1, animationNames[Math.floor(Math.random() * animationNames.length)], false);

	var mask = new PIXI.Graphics();
	mask.beginFill(0xFF3300);
	mask.lineStyle(0, 0x0000FF, 0);
	mask.drawRect(-fish.width, -170, fish.width * 4, 170);

	containerAnim.addChild(mask);
	containerAnim.addChild(fish);
	containerAnim.mask = mask;

	containerAnim.position.x = e.data.getLocalPosition(this.mapContainer).x;
	containerAnim.position.y = e.data.getLocalPosition(this.mapContainer).y;

	var random = Math.random() * (0.9 - 0.6) + 0.6;
	if (Math.random() > 0.5) {
		containerAnim.scale.x = -random;
		containerAnim.scale.y = random;
	} else {
		containerAnim.scale.x = containerAnim.scale.y = random;
	}

	this.mapContainer.addChild(containerAnim);

	this.fishs.push(containerAnim);

	// todo find bug for updateTransform when more than 1 fish
	for (var i = 0; i < this.fishs.length; i++) {
		var state = this.fishs[i].children[1].children[0].state;
		state.onComplete = function() {
			this.mapContainer.removeChild(this.fishs[0]);
			console.log(this.mapContainer.children.length);
			this.fishs.shift();
		}.bind(this)
	}

};



FishComponent.prototype.animate = function(e) {

}

module.exports = FishComponent;