class Settings

	@init: ->
		@bg     = Cookies.get('setting-bg', false) == "true"
		@point = Cookies.get('setting-point', false) == "true"
		@wall  = Cookies.get('setting-wall', false) == "true"

		$checkboxes = Game.$settings.find('input[type=checkbox]')

		$resetBtns = Game.$settings.find('img.reset-btn')

		$resetBtns.filter('#setting-reset-point').bind('click', { setting: 'point' }, @reset)
		$resetBtns.filter('#setting-reset-wall').bind('click', { setting: 'wall' }, @reset)
		$resetBtns.filter('#setting-reset-bg').bind('click', { setting: 'bg' }, @reset)

		$checkboxes.filter('#setting-bg').prop('checked', @bg)
		$checkboxes.filter('#setting-point').prop('checked', @point)
		$checkboxes.filter('#setting-wall').prop('checked', @wall)



		$checkboxes.bind('change', @updateSettings.bind(@))

	@reset: (e) ->
		Game.resetSetting(e.data.setting)

	@updateSettings: (e) ->
		@[e.target.id.replace('setting-', '')] = e.target.checked
		if e.target.checked
			Cookies.set(e.target.id, e.target.checked)
		else
			Cookies.remove(e.target.id)

