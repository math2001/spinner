<?php
/**
* Debugger
*/
function debug() {
	echo "<pre style='max-width: 100%; overflow: auto;'>";
	foreach (func_get_args() as $k => $v) {
		print_r($v);
	}
	echo "</pre>";
	return true;
}

/**
* Killer
*/
function kill() {
	call_user_func_array('debug', func_get_args());
	die();
}

/**
* A class to send var to javascript
*/
class JS {

	static $vars;

	/**
	* Add a var
	*/
	static function add($name, $value=null) {
		if (is_array($name)) {
			self::$vars += $name;
		} else {
			self::$vars[$name] = $value;
		}
		return true;

	}

	/**
	* Write vars in JavaScript
	*/
	static function write($return=false) {
		$js = '<script type="text/javascript">';
		foreach (self::$vars as $k => $v) {
			$js .= "$k=$v;";
		}
		$js .= '</script>';
		if ($return) {
			return $js;
		}
		echo $js."\n";
	}
	
}