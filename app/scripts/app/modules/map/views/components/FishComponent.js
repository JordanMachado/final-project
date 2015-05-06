var inherits = require('inherits');
var AbstractComponent = require('./AbstractComponent');
var Resources = require('Resources');

inherits(FishComponent, AbstractComponent);

var animationNames = [
	"jump-01",
	"jump-02"
];
var animationFish = []

function FishComponent(options) {
	AbstractComponent.call(this, options);
}

FishComponent.prototype.initialize = function(options) {

	/*
	 * Define the touch zone water
	 */

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

	this.graphic.interactive = true;
	this.graphic
		.on('mousedown', this.animate.bind(this))
		.on('touchstart', this.animate.bind(this))

	/* 
	 * Create fish container and
	 */

	this.containerAnim = new PIXI.Container();

	this.animation1 = new PIXI.spine.Spine(Resources.datas.fishBlue.spineData);
	this.containerAnim.addChild(this.animation1)
	animationFish.push(this.animation1);
	this.animation2 = new PIXI.spine.Spine(Resources.datas.fishGreen.spineData);
	this.containerAnim.addChild(this.animation2);
	animationFish.push(this.animation2);
	this.animation3 = new PIXI.spine.Spine(Resources.datas.fishPink.spineData);
	this.containerAnim.addChild(this.animation3);
	animationFish.push(this.animation3);


	// mask
	var mask = new PIXI.Graphics();
	mask.beginFill(0xFF3300);
	mask.lineStyle(0, 0x0000FF, 0);
	mask.drawRect(-this.containerAnim.width, -170, this.containerAnim.width * 4, 170);

	this.containerAnim.addChild(mask)
	this.containerAnim.mask = mask;

	this.graphic.addChild(this.containerAnim);

}

FishComponent.prototype.animate = function(e) {
	// console.log(e.data.getLocalPosition(this.container))
	// hide all fish
	for(var i = 0,ln = animationFish.length;i<ln;i++) {
		animationFish[i].visible = false;
	}


	var currentAnimation = Math.floor(Math.random() * animationFish.length);
	animationFish[currentAnimation].visible = true;
	animationFish[currentAnimation].state.setAnimationByName(1, animationNames[Math.floor(Math.random() * animationNames.length)], false);
	var random = Math.random() * (0.9 - 0.6) + 0.6;
	if (Math.random() > 0.5) {

		this.containerAnim.scale.x = -random;
		this.containerAnim.scale.y = random;
	} else {
		this.containerAnim.scale.x = this.containerAnim.scale.y = random;
	}

	this.containerAnim.position.x = e.data.getLocalPosition(this.mapContainer).x;
	this.containerAnim.position.y = e.data.getLocalPosition(this.mapContainer).y;

}

module.exports = FishComponent;