class Points

	@init: ->
		# [@$blue, @$red] = [$('.point.blue'), $('.point.red')]

		@radius = 70

		# calling spin withou any arguments makes the points get placed without being moved
		@red = new Point($('.point.red'), @radius, 'red', false).spin().render()
		@blue = new Point($('.point.blue'), @radius, 'blue', true).spin().render()
		@



	@render: ->
		@red.render()
		@blue.render()

	@checkCollide: (wall)->
		@red.checkCollide(wall) or @blue.checkCollide(wall)

	@spin: (way) ->
		@red.spin(way)
		@blue.spin(way)
		@


class Point

	constructor: (@$, @radius, @color, opposite) ->
		if opposite then @defaultAngle = 0 else @defaultAngle = -Math.PI
		@angle = @defaultAngle
		@width = @height = 20
		@spinCenter = [percentage(50, Game.width), Game.height - @radius - (@width / 2) - 20]
		@angleSpeed = 0.1


		@$.css({
			width: @width
			height: @height
			# 'background-color': @color
		})

	spin: (way) ->
		if way == 'left'
			@angle += @angleSpeed
		else if way == 'right'
			@angle -= @angleSpeed
		
		cos = Math.trunc(@radius * Math.cos(@angle))
		sin = Math.trunc(@radius * Math.sin(@angle))
		@x = @spinCenter[0] + cos
		@y = @spinCenter[1] + sin
		@

	render: ->
		@$.css('left', @x - @width / 2)
		@$.css('top', @y - @height / 2)
		@

	checkCollide: (wall) ->
		(
			(@x >= wall.x and @x < wall.x + wall.width) or
			(wall.x >= @x and wall.x < @x + @width)
			) and (
			(@y >= wall.y and @y < wall.y + wall.height) or
			(wall.y >= @y and wall.y < @y + @height)
		)