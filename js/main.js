(function ($) {

	$(function () {

		window.$game = $('#game');

		window.width  = $game.width()
		window.height = $game.height()

		window.radiusPer = 23;
		window.radius 	 = per(radiusPer, width)

		window.$play	 = $('#play')
		window.$tryAgain = $('#try-again')

		window.$lose 		= $('#lose');
		window.$settings 	= $('#settings');
		window.$levelPanel  = $('#level-panel');
		window.$menu		= $('#menu');
		window.$win         = $('#win');
		window.$topbar	    = $('#topbar');


		window.walls = [];
		window.prev_state = false;
		window.state = 'menu';
		window.score = new Score();
		window.current_level = false

		load_settings();

		window.red = new Point(false, $('#blue'));
		window.blue = new Point(true, $('#red'));

		red.render(); blue.render();

		var $goInfiniteMode  = $('.go-infinite-mode');
		var $goLevelPanel    = $('.go-level-panel');
		var $goSettings      = $('.go-settings');
		var $goMenu          = $('.go-menu');
		var $goLevel         = $('.go-level');
		var $tryAgain        = $('.try-again');
		var $goNextLevel     = $('.go-next-level');

		$goInfiniteMode.click(go_infinite_mode);
		$goLevelPanel.click(go_levels_panel);
		$goSettings.click(go_settings);
		$goLevel.click(go_levels_mode);
		$goMenu.click(go_menu);
		$tryAgain.click(try_again);
		$goNextLevel.click({level: window.current_level + 1}, go_levels_mode)

		listen_keyboard();


	})

})(jQuery)