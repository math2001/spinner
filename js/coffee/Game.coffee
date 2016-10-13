class Game

	@keydown = (e) ->
		if e.keyCode == keys.left
			@events.left = true
		else if e.keyCode == keys.right
			@events.right = true
		else if e.keyCode == keys.escape
			@events.stop = true
	@keyup = (e) ->
		if e.keyCode == keys.left
			@events.left = false
		else if e.keyCode == keys.right
			@events.right = false
		else
			# pass

	@bindDOM: ->		
		$(document.body)
			.bind('keydown', @keydown.bind(@))
			.bind('keyup', @keyup.bind(@))

	@unbindDOM: ->
		$(document.body).unbind('keydown', @keydown).unbind('keyup', @keyup)

	@gameOver: ->
		@events.stop = true
		@unbindDOM()
		log(@$gameOver)
		@$gameOver.attr('active', '')

	@init: ->
		@$main = $('.main')
		@$game = @$main.find('[data-name=game]')
		@$gameOver = @$main.find('[data-name=menu]')

		@pxToWaitBeforeAdding = 200

		@width = 300
		@height = 500
		

	@run: ->

		@walls = [new Wall()]

		@events = {
			left: false
			right: false
			stop: false # does not starts the game
		}

		@bindDOM()

		Points.init()

		mainLoop = ->
			for wall, i in @walls
				wall.update()
				if Points.checkCollide(wall)
					@gameOver()
				if wall.isOut()
					@walls[i] = null
					wall.remove()
					# Score.increase().render()
				wall.render()
			if @walls.get(-1).y > @pxToWaitBeforeAdding
				@walls.push(new Wall())

			@walls.remove(null)

			if @events.left
				Points.spin("left").render()
			if @events.right
				Points.spin("right").render()

			if not @events.stop
				setTimeout(mainLoop.bind(@), 15)

		mainLoop.bind(@)()


