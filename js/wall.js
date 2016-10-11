function Wall(pos) {


	this.info = function () {
		console.log('width:', this.width);
		console.log('height:', this.height)
		console.log('left:', this.left)
		console.log('top:', this.top)
	}

	this.move = function () {
		this.top += this.speed
		return this.top > height
	}

	this.render = function () {
		this.$.css('left', this.left)
		this.$.css('top', this.top)	

		return this

		// this.c.fillStyle = this.color
		// this.c.fillRect(this.left, this.top, this.width, this.height)
	}

	this.remove = function (trans) {
		var trans = typeof trans === "undefined" ? false : trans
		if (trans) {
			this.$.fadeOut(400, function () {
				$(this).remove()
			})
		} else {
			this.$.remove()
		}
	}

	var pos = typeof pos === "undefined" ? false : pos
	if (pos) {
		// choose the default pos
		this.width = pos.width;
		this.height = pos.height
		this.left = pos.left
	} else {
		this.width = rnd(30, (radius * 2) - 40);
		this.height = rnd(30, radius - 20);
		this.left = rnd(0, window.width - this.width);
	}
	this.speed = 5
	this.top = 0

	this.color = '#ccc'
	
	$element = $('<div class="wall"></div>').css({
		'width' : this.width, 
		'height': this.height
	})
	if (window.settings.changeWall) {
		$element.css('background-color', 'rgb(' + rnd(0, 255) + ', ' + rnd(0, 255) + ', ' + rnd(0, 255) + ')')
	}
	$game.append($element)
	this.$ = $element


}

