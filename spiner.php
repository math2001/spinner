<?php session_start() ?>
<?php require '.bdd-config.php'; ?>
<?php 

const JQUERY_PATH = 'http://localhost/tests/jquery.js';
const BASE_URL    = '/spiner/';

require 'func.php';

if (!empty($_POST)) {
	if (isset($_POST['username'], $_POST['pass'], $_POST['confirm'])) {
		if (!empty($_POST['confirm'])) {
			// sign in
		} else {
			// sign up
			$_POST['pass'] = sha1($_POST['pass']);
			$req = $bdd->prepare('SELECT id, username, created FROM users WHERE username=:username AND pass=:pass');
			unset($_POST['confirm'], $_POST['stay-co']);
			$req->execute($_POST);
			$donn = $req->fetch();
			if (!empty($donn)) {
				$_SESSION['user'] = $donn;
				$_SESSION['flash']['message'] = '<span class="success">Great! You have been successfully logged in!</span>';
				header('location: '.BASE_URL.'spiner');
			} else {
				$_SESSION['flash']['message'] = '<span class="error">Error, the identifiers are wrong!</span>';
				unset($_SESSION['user']);
			}

		}
	}
}

if (isset($_SESSION['user']['id'])) {
	// get level
	$req = $bdd->prepare('SELECT id, unlimited_score, created, campaign_level FROM users WHERE id=?');
	$req->execute([$_SESSION['user']['id']]);
	$donn = $req->fetch();
	// save into session
	$_SESSION['spiner']['unlimited_score'] = $donn['unlimited_score'];
	$_SESSION['spiner']['campaign_level'] = $donn['campaign_level'];

	$req->closeCursor();
	$req = $bdd->prepare('SELECT id, level, content FROM spiner WHERE level<=?');
	$req->execute([$donn['campaign_level']]);
	$donn = $req->fetchAll();
	$js = [];

	foreach ($donn as $k => $v) {
		$js[$v['level']] = $v['content'];
	}
	$js = '['.implode(',', $js).']';
	JS::add('window.available_levels', $js);
	js::add('window.URLToUpdateUserAndGetLevel', '"'.BASE_URL.'update-and-get-level.php"');
	// kill(htmlspecialchars(JS::write(true)));
}

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<!-- <link rel="stylesheet" type="text/css" href="css/main-1.css"> -->
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link rel="stylesheet" type="text/css" href="css/state.css">
	<link rel="stylesheet" type="text/css" href="css/form.css">
	<title>Spiner</title>
</head>
<body>
	<div id="debug"></div>
	<h1 class="center">SPINER</h1>
	<?php if (isset($_SESSION['flash']['message'])): ?>
		<p class="center"><?= $_SESSION['flash']['message'] ?></p>
	<?php endif ?>

	<?php if (isset($_SESSION['user']['id'])): ?>
		<!-- <div id="debug">...</div> -->
		<div id="game">
			<div id="topbar" class="hide">Score: <code class="score">0</code></div>
			<div id="blue"></div>
			<div id="red"></div>
			<!-- Menu -->
			<div id="menu" class="state show">
				<ul>
					<li><button type="button" class="go-infinite-mode">Infinite Mode</button></li>
					<li><button type="button" class="go-level-panel">Level Mode</button></li>
					<li><button type="button" class="go-settings">Settings</button></li>
					<li>By Math2001</li>
				</ul>
			</div>
			<!-- Lose -->
			<div id="lose" class="state hide">
				<h3 class="state--title">Game <b>OVER</b>!</h3>
				<p class="center"><big>Score: <code class="score">0</code></big></p>
				<p class="center" id="play"><button type="button" class="go-infinite-mode">Play <code>[space]</code></button></p>
				<p class="center" id="try-again"><button type="button" class="try-again">Try again [space]</button></p>
				<p class="center"><button type="button" class="go-menu">Menu <code>[escape]</code></button></p>
			</div>
			<!-- Settings -->
			<div id="settings" class="state hide">
				<h3 class="state--title">Settings</h3>
				<p>
					<label for="ch-bg"><input type="checkbox" id="ch-bg">
					<span class="mycheckbox"></span> Changing background</label>
				</p>
				<p>
					<label for="ch-wl"><input type="checkbox" id="ch-wl">
					<span class="mycheckbox"></span> Changing wall</label>
					</p>
				<p>
					<label for="ch-pt"><input type="checkbox" id="ch-pt">
					<span class="mycheckbox"></span> Changing point</label>
				</p>
				<p class="center bottom">
					<button type="button" class="go-menu">Done!</button>
				</p>
			</div>
			<!-- Levels Panel -->
			<div id="level-panel" class="state hide">
				<?php $html = '' ?>
				<?php for ($i = 0; $i < 20; $i++): ?>
					<?php $html .= '<button type="button" class="go-level"'.(sizeof($js) >= $i ? ' level='.$i : ' block=true').'>Level '.$i.'</button>' ?>
				<?php endfor; ?>
				<?= $html ?>
				<p class="center bottom">
					<button type="button" class="go-menu">Back to menu</button>
				</p>
			</div>
			<!-- Win -->
			<div id="win" class="state hide">
				<h3 class="state--title">Win!</h3>
				<p class="center"><big>Yes! you just unlock the next level!</big
				></p>
				<p class="center"><button type="button" class="go-next-level">Try it now! <code>[space]</code></button></p>
				<p class="center"><button type="button" class="go-menu">Back to the menu <code>[Escape]</code></button></p>
			</div>
		</div>
		<?php JS::write() ?>
		<script type="text/javascript" src="<?= JQUERY_PATH ?>"></script>
		<script type="text/javascript" src="js/func.js"></script>
		<script type="text/javascript" src="js/game-func.js"></script>
		<script type="text/javascript" src="js/score.js"></script>
		<script type="text/javascript" src="js/time.js"></script>
		<script type="text/javascript" src="js/point.js"></script>
		<script type="text/javascript" src="js/wall.js"></script>
		<script type="text/javascript" src="js/main.js"></script>

	<?php else: ?>
		
		
		<form action="?" method="post">
			<p><input type="text" name="username" placeholder="Username" autocomplete="off"></p>
			<p><input type="password" name="pass" placeholder="Password" autocomplete="off"></p>
			<p class="signup hide"><input type="password" name="confirm" placeholder="Confirm" autocomplete="off" id="confirm"></p>
			<p><label for="stay-co"><input type="checkbox" name="stay-co" id="stay-co"><span class="mycheckbox small"></span> Remember me</label></p>
			<p class="signin">
				<input type="submit" value="Sign in"> or <a type="button" href="#signup" onclick="$('.signup').show(); $('.signin').hide();$('#confirm').val('');">sign up</a>
			</p>
			<p class="signup hide"><input type="submit" value="Sign up"> or <a type="button" href="#signin" onclick="$('.signin').show();$('#confirm').val('');
			;$('.signup').hide()">sign in</a></p>
		</form>
		
		<script type="text/javascript" src="<?= JQUERY_PATH ?>"></script>
		<script type="text/javascript">
			if (location.hash == '#signup') {
				$('.signup').show()
				$('.signin').hide()
				;$('#confirm').val('');
			}
		</script>

	<?php endif ?>

</body>
</html>