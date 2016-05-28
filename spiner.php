<?php session_start() ?>
<?php const JQUERY_PATH = 'http://localhost/tests/jquery.js' ?>
<?php 

/**
* Debugger
*/
function debug() {
	echo "<pre>";
	foreach (func_get_args() as $k => $v) {
		print_r($v);
	}
	echo "</pre>";
	return true;
}

if (!empty($_POST)) {
	if (isset($_POST['username'], $_POST['pass'], $_POST['confirm'])) {
		if (empty($_POST['confirm'])) {
			// sign in
		} else {
			// sign up
		}
		debug($_POST);
	}
}

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link rel="stylesheet" type="text/css" href="css/form.css">
	<title>Spiner</title>
</head>
<body>
	<?php if (isset($_SESSION['logged']) and $_SESSION['logged']): ?>
		<div id="debug">...</div>
		<div id="game">
			<div id="topbar" class="hide">Score: <code class="score">0</code></div>
			<div id="blue"></div>
			<div id="red"></div>
			<div id="menu" class="show">
				<ul>
					<li><button type="button" class="play">Play</button></li>
					<li><button type="button" class="settings">Settings</button></li>
					<li>By Math2001</li>
				</ul>
			</div>
			<div id="lose" class="hide">
				<p>Game <b>OVER</b>!</p>
				<p>Score: <code class="score">0</code></p>
				<button type="button" class="play">Play <code>[space]</code></button><br>
				<button type="button" class="menu">Menu <code>[backspace]</code></button>
			</div>
			<div id="settings" class="hide">
				<h3>Settings</h3>
				<p><label for="ch-bg"><input type="checkbox" id="ch-bg"><span class="mycheckbox"></span> Changing background</label></p>
				<p><label for="ch-wl"><input type="checkbox" id="ch-wl"><span class="mycheckbox"></span> Changing wall</label></p>
				<p><label for="ch-pt"><input type="checkbox" id="ch-pt"><span class="mycheckbox"></span> Changing point</label></p>
				<p class="center">
					<button type="button" class="menu">Done!</button>
				</p>
			</div>
		</div>
		<script type="text/javascript" src="js/func.js"></script>
		<script type="text/javascript" src="js/score.js"></script>
		<script type="text/javascript" src="js/time.js"></script>
		<script type="text/javascript" src="js/point.js"></script>
		<script type="text/javascript" src="js/wall.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
		<script type="text/javascript" src="<?= JQUERY_PATH ?>"></script>

	<?php else: ?>
		
		<h1 class="center">SPINER</h1>
		<form action="?" method="post">
			<p><input type="text" name="username" placeholder="Username" autocomplete="off"></p>
			<p><input type="password" name="pass" placeholder="Password" autocomplete="off"></p>
			<p class="signup hide"><input type="password" name="confirm" placeholder="Confirm" autocomplete="off"></p>
			<p><label for="stay-co"><input type="checkbox" name="stay-co" id="stay-co"><span class="mycheckbox small"></span> Remember me</label></p>
			<p class="signin">
				<input type="submit" value="Sign in"> or <a type="button" href="#signup" onclick="$('.signup').show(); $('.signin').hide()">sign up</a>
			</p>
			<p class="signup hide"><input type="submit" value="Sign up"> or <a type="button" href="#signin" onclick="$('.signin').show()
			;$('.signup').hide()">sign in</a></p>
		</form>
		
		<script type="text/javascript" src="<?= JQUERY_PATH ?>"></script>
		<script type="text/javascript">
			if (location.hash == '#signup') {
				$('.signup').show()
				$('.signin').hide()
			}
		</script>

	<?php endif ?>

</body>
</html>