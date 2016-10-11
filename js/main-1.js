(function ($) {
	$(function () {

		$blue  = $('#blue');
		$red   = $('#red');
		$game  = $('#game');
		$debug = $('#debug');

		$menu       = $('#menu');
		$topbar     = $('#topbar');
		$lose       = $('#lose');
		$settings   = $('#settings');
		$levelspanel = $('#levels-panel');
		$win = $('#win');

		$goinf      = $('.go-infinite-mode');
		$gomenu     = $('.go-menu');
		$gosettings = $('.go-settings');
		$golvl		= $('.go-level-mode')

		$chbg = $('#ch-bg');
		$chpt = $('#ch-pt');
		$chwl = $('#ch-wl');

		$levelchooser = $('.level[level]')
 
		width  = $game.width();
		height = $game.height();

		radiusPer = 23;
		radius = per(radiusPer, width);

		left = false
		right = false

		current_level = false
		current_wall = false

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

		$levelchooser.click(function (e) {
			var level = $(this).attr('level')
			if (available_levels[level] != 'undefined') {
				current_level = available_levels[level]
				current_wall  = 0
				state = 'playing'
				play()
			} else {
				console.log('error', level)
			}
		})

		$goinf.click(play)
		$gomenu.click(menu)
		$gosettings.click(show_settings);
		$golvl.click(levels)
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
			$levelspanel.fadeOut()
		}	
		function menu(ev) {
			load_settings()
			state = 'menu'
			$menu.fadeIn()
			$lose.fadeOut()
			$settings.fadeOut()
			$topbar.fadeOut()
			$levelspanel.fadeOut()
		}
		function play(ev) {
			state = 'playing'
			$levelspanel.fadeOut()
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

			if (current_wall !== false && current_level !== false) {
				// try again
				// current_level stay the same
				current_wall = 0
			} else {
				$topbar.fadeIn();
			}
			game();
		}
		function lose() {
			state = 'lose'
			$settings.fadeOut()
			$menu.fadeOut()
			$lose.fadeIn();
			$topbar.fadeOut()
			$levelspanel.fadeOut()
		}
		function levels(ev) {
			state = 'level-panel';
			$levelspanel.fadeIn()
			$settings.fadeOut();
			$menu.fadeOut();
			$lose.fadeOut();
			$topbar.fadeOut();
		}
		function win() {
			$win.fadeIn();

		}

	
		walls = []
		state = 'menu'
		load_settings();

		blue = new Point('rgba(0, 136, 255, 1.0)', true, $('#blue'));
		red = new Point('rgba(255, 0, 0, 1.0)', false, $('#red'))
		score = new Score();
		blue.render()
		red.render()

		function game() {
			if (right) {
				blue.spin('right')
				red.spin('right')
			}
			if (left) {
				blue.spin('left')
				red.spin('left')
			}

			blue.render()
			red.render()
			// if (walls[walls.length - 1]) {
			// 	if (walls[walls.length - 1].top > 200) {
			// 		walls.push(new Wall());
			// 	}
			// } else {
			// 	walls.push(new Wall());
			// }

			if (
				(walls[walls.length - 1] && walls[walls.length - 1].top > 200 ) || (walls.length == 0)
			) {
				if (current_level !== false && current_wall !== false) {
					// console.log('from level', walls.length)
					if (current_level[current_wall]) {
						walls.push(new Wall(current_level[current_wall]))
						current_wall++
					} else {
						if (walls.length == 0) {
							win()
						}
						// win()
					}

				} else {
					walls.push(new Wall())
				}
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
				}
			}, 22)
		}

	})

})(jQuery)
