(function ($) {
	$(function () {

		$blue  = $('#blue');
		$red   = $('#red');
		$game  = $('#game');
		$debug = $('#debug');

		$menu       = $('#menu');
		$topbar     = $('#topbar');
		$goplay     = $('.play');
		$gomenu     = $('.menu');
		$gosettings = $('.settings');
		$lose       = $('#lose');
		$settings   = $('#settings');

		$chbg = $('#ch-bg');
		$chpt = $('#ch-pt');
		$chwl = $('#ch-wl');

		width  = $game.width();
		height = $game.height();

		// window.c = $game[0].getContext('2d')

		radiusPer = 23;
		radius = per(radiusPer, width);

		left = false
		right = false

		$(document).bind('keydown', function (e) {
			// 37, 39
			if (e.keyCode == 39) {
				left = true
			} else if (e.keyCode == 37) {
				right = true
			}

			if (e.keyCode == 32 && state == 'lose') {
				play(e)
			} else if (e.keyCode == 8 && state == 'lose') {
				menu(e)
			}
			e.preventDefault()
		})
		$(document).bind('keyup', function (e) {
			// 37, 39
			if (e.keyCode == 39) {
				left = false
			} else if (e.keyCode == 37) {
				right = false
			}
		})
		
		$goplay.click(play)
		$gomenu.click(menu)
		$gosettings.click(show_settings)
		function load_settings() {
			obj_settings = {
				chbg: $chbg[0].checked, // change background color
				chwl: $chwl[0].checked, // change walls color
				chpt: $chpt[0].checked, // change points color
			}
		}

		function show_settings(ev) {
			state = 'settings'
			$menu.fadeOut(400)
			$lose.fadeOut(400)
			$settings.fadeIn()
		}	
		function menu(ev) {
			load_settings()
			state = 'menu'
			$menu.fadeIn()
			$lose.fadeOut()
			$settings.fadeOut()
			$topbar.fadeOut()
		}
		function play(ev) {
			state = 'playing'
			if (obj_settings.chbg) {
				$game.css('background-color', 'rgb(' + rnd(0, 255) + ', ' + rnd(0, 255) + ', ' + rnd(0, 255) + ')')
			} else {
				$game.css('background-color', '#333')
			}
			$menu.fadeOut()
			$lose.fadeOut()
			$settings.fadeOut()
			blue.reset()
			red.reset()
			score.reset()
			score.render()
			for (var i = 0; i < walls.length; i++) {
				walls[i].remove(true) // true: transition before removing
			}
			walls = []
			$topbar.fadeIn()
			game();
		}
		function lose() {
			state = 'lose'
			$settings.fadeOut()
			$menu.fadeOut()
			$lose.fadeIn();
			$topbar.fadeOut()
		}

	
		walls = []
		state = 'menu'
		load_settings()

		blue = new Point('rgba(0, 136, 255, 1.0)', true, $('#blue'));
		red = new Point('rgba(255, 0, 0, 1.0)', false, $('#red'))
		score = new Score();
		blue.render()
		red.render()



		var count = 0;
		function game() {
			if (right) {
				blue.spin('right')
				red.spin('right')
			}
			if (left) {
				blue.spin('left')
				red.spin('left')
			}

			count += 1
			blue.render()
			red.render()
			if (walls[walls.length - 1]) {
				if (walls[walls.length - 1].top > 200) {
					walls.push(new Wall());
				}
			} else {
				walls.push(new Wall());
			}
			for (var i = 0; i < walls.length; i++) {
				if (
					blue.collide(walls[i].left, walls[i].top, walls[i].width, walls[i].height) ||
					red.collide(walls[i].left, walls[i].top, walls[i].width, walls[i].height)
				) {
					lose()
				}
				if (walls[i].move()) { // the wall is out of the screen
					walls[i].remove()
					walls.remove(i)
					blue.rnd_color()
					red.rnd_color()
					score.add();
					score.render();
					if (obj_settings.chbg) {
						$game.css('background-color', 'rgb(' + rnd(0, 255) + ', ' + rnd(0, 255) + ', ' + rnd(0, 255) + ')')
					} else {
						$game.css('background-color', '#333')
					}
				} else {
					walls[i].render()
				}

			}
			window.setTimeout(function () {
				if (state == 'playing')  {
					game()
				} else if (state == 'menu') {
					$menu.fadeIn()
				} else if (state == 'lose') {
					$lose.fadeIn()
				}
			}, 22)
		}

	})

})(jQuery)
