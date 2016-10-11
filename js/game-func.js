function load_settings() {
	if (!window.$chwl) {
		window.$chwl = $('#ch-wl');
	}
	if (!window.$chpt) {
		window.$chpt = $('#ch-pt');
	}
	if (!window.$chbg) {
		window.$chbg = $('#ch-bg');
	}
	window.settings = {
		changePoint     : window.$chpt[0].checked,
		changeWall      : window.$chwl[0].checked,
		changeBackground: window.$chbg[0].checked,
	};
}

function closeAllState($el) {
	window.$lose.fadeOut();
	window.$settings.fadeOut();
	window.$menu.fadeOut();
	window.$levelPanel.fadeOut();
	window.$win.fadeOut();
	var $el = typeof $el === "undefined" ? false : $el;
	if ($el) {
		$el.fadeIn();
	}
}

function reset() {
	window.$topbar.fadeIn()
	load_settings();
	score.reset().render();
	blue.reset().render();
	red.reset().render();
	change_bg();
	for (var i = 0, wall; wall = walls[i]; i++) {
		wall.remove(true) // anim on remove
	}
	window.walls = [];
}

function go_infinite_mode(e) {
	window.prev_state = window.state
	window.state = 'infinite';
	closeAllState();
	window.$play.show();
	window.$tryAgain.hide();
	reset();
	game();
}

function go_levels_panel(e) {
	// Panel to choose the level
	closeAllState();
	window.$play.hide();
	window.$tryAgain.show();
	$levelPanel.fadeIn();
	return true;
}

function go_levels_mode(e, level) {
	// Watch out! it is level MODE, when a level has alredy be choosed!
	var level = typeof level === "undefined" ? false : level;
	if (e.data && e.data.level) level = e.data.level
	window.prev_state = window.state;
	window.state = 'levels';
	if (level) {
		window.current_level = level
	} else {
		window.current_level = $(this).attr('level');
	}
	closeAllState();
	reset();
	if (available_levels[window.current_level] == undefined) {
		console.log(level, window.current_level, e.data);
		console.log('error, no level');
		return false;
	}
	game(available_levels[window.current_level], 0);
	return true;
}

function go_settings(e) {
	window.prev_state = window.state;
	window.state = 'settings';
	closeAllState(window.$settings);
	return true;
}

function go_menu(e) {
	window.prev_state = window.state;
	window.state = 'menu';
	closeAllState(window.$menu);
	return true;
}

function lose() {
	window.prev_state = window.state;
	window.state = 'lose';
	window.$topbar.fadeOut();
	closeAllState(window.$lose);
}

function win() {
	if (window.current_level == window.available_levels.length - 1) {
		console.log('get next level');
		// ajax get next level
		$.ajax({
			url: window.URLToUpdateUserAndGetLevel,
			method: "POST",
			data: {
				
			}
		}).done(function (res) {
			// level in a string format
			debug(res);
		}).fail(function () {
			alert('fail during the loading of the next level')
		})
	} else {
		window.current_level++
		console.log('level alredy unlock!');
	}
	// show win state
	window.prev_state = window.state;
	window.state = 'win';
	closeAllState(window.$win);
	window.$topbar.fadeOut();
	// update campaign
}

function try_again(e) {
	window.prev_state = window.state;
	window.state = 'levels';
	reset();
	closeAllState();
	game(available_levels[window.current_level], 0)
}

function listen_keyboard_() {
	var prevent;
	$(document).keydown(function (e) {
		prevent = false
		if (e.keyCode == 39) { // LEFT
			prevent = true
			window.left = true
		} else if (e.keyCode == 37) { // RIGHT
			prevent = true
			window.right = true
		} else if (e.keyCode == 27) { // ESCAPE
			prevent = true
			if (window.state == 'lose') {
				go_menu()
			}
		} else if (e.keyCode == 32) { // SPACE
			if (window.prev_state == 'infinite') {
				go_infinite_mode();
			} else if (window.prev_state == 'levels' && window.state != 'win') {
				try_again();
			} else if (window.state == 'win') {
				console.log('unknow');
				return null;
				console.log(window.current_level);
				go_levels_mode(null, parseInt(window.current_level) + 1)
			}
			prevent = true;
		} else if (e.keyCode == 80) { // P
			window.state = 'pause'
		}
		if (prevent) {
			e.preventDefault();
		}
	})
	$(document).keyup(function (e) {
		var prevent = false
		if (e.keyCode == 39) {
			prevent = true
			window.left = false
		} else if (e.keyCode == 37) {
			prevent = true
			window.right = false
		}
		if (prevent) e.preventDefault()
	})
}

function listen_keyboard() {
	var prevent;
	$(document).keydown(function (e) {
		prevent = false
		if (e.keyCode == 39) { // LEFT
			prevent = true
			window.left = true
		} else if (e.keyCode == 37) { // RIGHT
			prevent = true
			window.right = true
		}
		if (prevent) {
			e.preventDefault()
		}
	}).keyup(function (e) {
		prevent = false;
		if (e.keyCode == 39) { // LEFT
			prevent = true
			window.left = false
		} else if (e.keyCode == 37) { // RIGHT
			prevent = true
			window.right = false
		}
		if (prevent) {
			e.preventDefault()
		}
	})


}

function change_bg() {
	if (window.settings.changeBackground) {
		$game.css('background-color', rgb('rnd'));
	} else {
		$game.css('background-color', '#333');
	}
}

function game(level, nbwall) {
	var level = typeof level === "undefined" ? false : level
	var nbwall = typeof nbwall === "undefined" ? false : nbwall

	if (window.right) {
		blue.spin('right');
		red.spin('right');
	}
	if (window.left) {
		blue.spin('left');
		red.spin('left');
	}

	window.red.render();
	window.blue.render();

	// add wall
	if (
		// last wall is down enough to add an other one
		(window.walls[window.walls.length - 1] && window.walls[window.walls.length - 1].top > 200) ||
		// no wall on the screen
		(window.walls.length == 0)
	) {
		if (!level) {
			window.walls.push(new Wall());
		} else {
			if (typeof level[nbwall] == 'undefined') {
				if (window.walls.length == 0) {
					win();
				}
			} else {
				window.walls.push(new Wall(level[nbwall]))
				nbwall++
			}
		}
	}

	for (var i = 0, wall; wall = window.walls[i]; i++) {
		// check is a wall is touching a point
		if (
			blue.collide(wall.left, wall.top, wall.width, wall.height) ||
			red.collide(wall.left, wall.top, wall.width, wall.height)
		) {
			lose();
		}
		// Move walls and chek is it's not out of the screen
		if (wall.move()) {
			wall.remove();
			window.walls.remove(i);

			window.blue.rnd_color();
			window.red.rnd_color();

			window.score.add();
			window.score.render();

			change_bg();
		}

		wall.render();
	}

	window.setTimeout(function() {
		if (window.state == 'infinite') {
			game();
		}
		if (window.state == 'levels') {
			game(level, nbwall);
		}
	}, 22);
}