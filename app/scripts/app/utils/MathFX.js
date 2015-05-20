module.exports = {
	distance: function(a, b) {
		return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
	},
	randomRange: function(min,max) {
		 return Math.random() * (max - min) + min;
	}
}