function Rect(top, left, width, height) {
	
	// this class is inspired a lot by the Rect in pygame (Python)

	this.top = top
	this.left = left
	this.width = width
	this.height = height

	this.right = this.left + this.width
	this.bottom = this.top + this.height

	this.collideRect = function (rect) {
		


	}

	this.top = function (new_val) {
		if (typeof new_val == 'undefined') {
			return this.top
		}
		this.top
		return this
	}

	this.move = function (x, y) {

		this.left += x
		this.right += x

		this.top += y
		this.bottom += y
		return this

	}

}