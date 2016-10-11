function Score() {
	
	this.add = function () {
		this.score++;
		return this;
	}

	this.reset = function () {
		this.score = 0;
		return this;
	}

	this.render = function () {
		$('.score').text(this.score);
		return this;
	}

	this.get = function () {
		return this.score;
		return this;
	}
	this.score = 0;

}