function Score() {
	
	this.add = function () {
		this.score++
	}

	this.reset = function () {
		this.score = 0
	}

	this.render = function () {
		$('.score').text(this.score)
	}

	this.get = function () {
		return this.score
	}
	this.score = 0

}