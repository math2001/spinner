class Game

	@keydown: (e) ->
		if e.keyCode == keys.left
			@events.left = true
		else if e.keyCode == keys.right
			@events.right = true
		else if e.keyCode == keys.escape
			@events.stop = true

	@keyup: (e) ->
		if e.keyCode == keys.left
			@events.left = false
		else if e.keyCode == keys.right
			@events.right = false
		

	@mousedown: (e) ->
		if @state != 'game'
			return 
		if e.originalEvent.touches[0].pageX > document.body.clientWidth / 2
			@events.left = true
		else
			@events.right = true
		false

	@mouseup: ->
		if @state != 'game'
			return 
		@events.left = false
		@events.right = false
		false



	@bindDOM: ->		
		$(document.body)
			.bind('keydown', @keydown.bind(@))
			.bind('keyup', @keyup.bind(@))
			.bind('touchstart', @mousedown.bind(@))
			.bind('touchend', @mouseup.bind(@))
			


		@$settings.find('input').bind('change', @updateSettings)

	@unbindDOM: ->
		$(document.body).unbind('keydown', @keydown).unbind('keyup', @keyup)

	

	@init: ->
		@$main     = $('.main')
		@$game     = @$main.find('[data-name=game]')
		@$gameOver = @$main.find('[data-name=gameover]')
		@$menu     = @$main.find('[data-name=menu]')
		@$settings = @$main.find('[data-name=settings]')

		@pxToWaitBeforeAdding = 200

		@width = 300
		@height = 500

		@walls = []

		@bindDOM()

		Settings.init()

		@state = 'menu'

		@events = {
			left: false
			right: false
			stop: false
		}

	@resetSetting: (setting) ->
		switch setting
			when 'bg'
				@$game.css('background-color', '')
			when 'point'
				Points.resetColor()


		
	@play: ->

		@state = 'game'

		for wall in @walls
			wall.remove()

		@$gameOver.removeAttr('active')
		@$menu.removeAttr('active')
		@$settings.removeAttr('active')
		@$game.attr('active', '')

		Score.reset().render()

		@walls = [new Wall()]

		@events = {
			left: false
			right: false
			stop: false
		}


		Points.init()

		mainLoop = ->
			if @events.left
				Points.spin("left").render()
			if @events.right
				Points.spin("right").render()
			

			for wall, i in @walls
				wall.update()
				if Points.checkCollide(wall)
					@gameOver()
				else if wall.isOut()
					@walls[i] = null
					wall.remove()
					Score.add().render()
					if Settings.bg
						@$game.css('background-color', randomColor())
					if Settings.point
						Points.changeColor()
				wall.render()

			# add a wall
			if @walls.get(-1).y > @pxToWaitBeforeAdding
				@walls.push(new Wall())

				


			@walls.remove(null)

			

			if not @events.stop
				setTimeout(mainLoop.bind(@), 20)

		mainLoop.bind(@)()


	@settings: ->
		@$settings.attr('active', '')
		@$gameOver.removeAttr('active')
		@$menu.removeAttr('active')
		@state = 'settings'

	@menu: ->
		@$gameOver.removeAttr('active')
		@$settings.removeAttr('active')
		@$menu.attr('active', '')
		@state = 'menu'

	@gameOver: ->
		@state = 'gameover'
		@events.stop = true
		@$gameOver.attr('active', '')
