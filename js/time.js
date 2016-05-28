function Time() {
	
	this.time = Date.now()

	this.get = function () {
		return Date.now() - this.time
	}

	this.reset = function () {
		this.time = Date.now()
		return this
	}

}