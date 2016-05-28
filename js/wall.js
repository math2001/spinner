function Wall() {


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
		trans = typeof trans === "undefined" ? false : trans
		if (trans) {
			this.$.fadeOut(400, function () {
				$(this).remove()
			})
		} else {
			this.$.remove()
		}
	}

	this.speed = 5

	this.color = '#ccc'

	this.width = rnd(30, (radius * 2) - 40);
	this.height = rnd(30, radius - 20);

	this.left = rnd(0, window.width - this.width);
	this.top  = 0
	
	$element = $('<div class="wall"></div>').css({
		'width' : this.width, 
		'height': this.height
	})
	if (obj_settings.chwl) {
		$element.css('background-color', 'rgb(' + rnd(0, 255) + ', ' + rnd(0, 255) + ', ' + rnd(0, 255) + ')')
	}
	$game.append($element)
	this.$ = $element


}

