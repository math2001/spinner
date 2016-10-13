class Wall

	constructor: ->
		@speed = 5
		@width = rnd(20, 80)
		@height = rnd(20, 80)
		@x = rnd(0, Game.width - @width)
		@y = 0
		@$ = $('<div class="wall"></div>').css
			width: @width
			height: @height
			left: @x
			top: 0
		Game.$game.append(@$)	


	update: ->
		@y += @speed
		@

	render: ->
		@$.css
			left: @x
			top: @y

	isOut: ->
		@y > Game.height

	remove: ->
		@$.remove()
		@