function per(percentage, val) {
	// return the percentage of val
	// per(50, 200) -> 100
	return (percentage / 100) * val
}


function rnd(min, max, integer) {
	integer = typeof integer === "undefined" ? true : integer
	if (!integer) {
		return Math.random() * (max - min) + min;
	} else {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
}

function debug() {
	var html = '';
	for (var i = 0; i < arguments.length; i++) {
		html += arguments[i] + ' '
	}
	$debug.html(html)
}


window.requestAnimFrame = (function(){
	return window.requestAnimationFrame    ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame	   ||
		window.oRequestAnimationFrame      ||
		window.msRequestAnimationFrame     ||
		function(callback){
			window.setTimeout(callback, 1000 / 60);
		};
})();

Array.prototype.remove = function(index) {
	if (typeof index == 'number') index = [index]
	var _this = []
	for (var i = 0; i < this.length; i++) {
		_this.push(this[i])
	}
	while (this.length > 0) {
		this.pop()
	}
	for (var i = 0; i < _this.length; i++) {
		if (index.indexOf(i) == -1) {
			this.push(_this[i])
		}
	}
};