<?php


$text = '';
$max = 5;
for ($i=0; $i < $max; $i++) { 
	$width = rand(10, 80);
	$height = rand(10, 60);
	$left = rand(0, 300 - $width);
	$text .= '{"width": '.$width.', "height": '.$height.', "left": '.$left.'}'.($i != $max - 1 ? ',' : '');
}

echo '<code>['.$text.']';

echo "<br>";

echo `{"width": 20, "height": 20, "left": 0}`;