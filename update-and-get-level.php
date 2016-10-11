<?php
session_start();
require 'func.php';
debug($_POST);
debug($_GET);
debug($_SESSION);
die('end');