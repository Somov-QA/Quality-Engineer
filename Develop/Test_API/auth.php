<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

date_default_timezone_set("Europe/Moscow");

/*	
	Пример обращения к этому API
	http://localhost/Test_API/auth.php?name=admin&pass=0000
*/

if (isset($_GET["name"]) && isset($_GET["pass"]))
{
	if ($_GET["name"] == "admin" && $_GET["pass"] == "0000")
		print('{"status":"PASSED","token":"84F35R2gh75CV25D542208WEnMo5425F0F1358"}');
	else
		print('{"status":"FAILED","token":""}');
}
elseif (isset($_POST["name"]) && isset($_POST["pass"]))
{
	if ($_POST["name"] == "admin" && $_POST["pass"] == "0000")
		print('{"status":"PASSED","token":"84F35R2gh75CV25D542208WEnMo5425F0F1358"}');
	else
		print('{"status":"FAILED","token":""}');
}
else
{
	print('{"status":"ERROR","token":""}');
}

?>