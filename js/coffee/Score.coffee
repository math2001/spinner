class Score

	@init: ->
		@$elements = $('.score')
		@score = 0
		@

	@add: ->
		@score += 1
		@

	@render: ->
		@$elements.text(@score)
		@
	@reset: ->
		@score = 0
		@
