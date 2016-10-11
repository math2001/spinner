function Point(opposite, $element) {

	this.render = function () {
		this.$.css('left', this.x - this.width / 2)
		this.$.css('top', this.y - this.height / 2)
		// this.c.fillStyle = this.color
		// this.c.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
		return this
	}

	this.info = function () {
		console.log('x    :', this.x)
		console.log('y    :', this.y)
		console.log('angle:', this.angle)
		return this
	}

	this.spin = function (way) {
		if (way == 'left') {
			this.angle += this.angleSpeed
		} else if (way == 'right') {
			this.angle -= this.angleSpeed
		}
		// else, just place the point
		var cos = Math.trunc(this.radius * Math.cos(this.angle))
		var sin = Math.trunc(this.radius * Math.sin(this.angle))
		this.x = this.spin_center[0] + cos
		this.y = this.spin_center[1] + sin
		return this
	}

	this.collide = function (left, top, width, height) {

		var first = {
			'name'  : 'first',
			'left'  : left,
			'top'   : top,
			'width' : width,
			'height': height,
			'bottom': top + height,
			'right' : left + width
		}
		var me = {
			'name'  : 'me',
			'left'  : this.x - this.width / 2,
			'top'   : this.y - this.height / 2,
			'width' : this.width,
			'height': this.height,
			'bottom': this.y - this.height / 2 + this.height,
			'right' : this.x - this.width / 2 + this.width
		}

		var biggest, smallest

		if (first['width'] > me['width']) {
			biggest  = first
			smallest = me
		} else {
			biggest  = me
			smallest = first
		}

		var x = this.x - this.width / 2
		if ( // x axe
			(biggest['left'] <= smallest['left'] && biggest['right'] >= smallest['left'] + smallest['width']) || // wrap
			(biggest['left'] >= smallest['left'] && biggest['left'] <= smallest['right']) ||
			(biggest['right'] >= smallest['left'] && biggest['right'] <= smallest['right'])
		) {

			if (first['height'] > me['height']) {
				biggest  = first
				smallest = me
			} else {
				biggest  = me
				smallest = first
			}

			if ( // y axe
				(biggest['top'] <= smallest['top'] && biggest['bottom'] >= smallest['top'] + smallest['height']) || // wrap
				(biggest['top'] >= smallest['top'] && biggest['top'] <= smallest['bottom']) ||
				(biggest['bottom'] >= smallest['top'] && biggest['bottom'] <= smallest['bottom'])
			) {
				return true
			}
		}
		return false;
	}

	this.reset = function () {
		this.angle = this.defaultAngle
		this.spin(false)
		this.rnd_color()
		return this
	}

	this.rnd_color = function () {
		if (window.settings.changePoint) {
			this.$.css('background-color', 'rgb(' + rnd(0, 255) + ', ' + rnd(0, 255) + ', ' + rnd(0, 255) + ')')
		} else if (opposite) {
			this.$.css('background-color', '#008aff')
		} else {
			this.$.css('background-color', '#f00')
		}
		return this
	}

	// x and y are the center of the point

	this.width = this.height = 20
	this.radius = radius
	this.spin_center = [per(50, width), height - this.radius - this.height / 2] // divide by two because y has to be the center
	this.angleSpeed = 0.1

	this.$ = $element
	this.rnd_color()

	if (opposite) {
		this.defaultAngle = -Math.PI
	} else {
		this.defaultAngle = 0
	}
	this.angle = this.defaultAngle
	this.spin(false)
	this.angle = this.defaultAngle

}