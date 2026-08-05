<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

date_default_timezone_set("Europe/Moscow");

/*	
	Пример обращения к этому API
	http://localhost/Test_API/product.php?id=123&token=0000000000
*/

if (isset($_GET["id"]) && isset($_GET["token"]))
{
	if ($_GET["token"] == "84F35R2gh75CV25D542208WEnMo5425F0F1358")
		print('{"product_id":"'.$_GET["id"].'","name":"Test product"}');
	else
		print('{"status":"FAILED","id":"'.$_GET["id"].'", "token":"'.$_GET["token"].'"}');
}
elseif (isset($_POST["id"]) && isset($_POST["token"]))
{
	if ($_POST["token"] == "84F35R2gh75CV25D542208WEnMo5425F0F1358")
		print('{"product_id":"'.$_GET["id"].'","name":"Test product"}');
	else
		print('{"status":"FAILED","id":"'.$_GET["id"].'", "token":"'.$_GET["token"].'"}');
}
else
{
	print('{"status":"ERROR","id":"'.$_GET["id"].'", "token":"'.$_GET["token"].'"}');
}

?>