<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

date_default_timezone_set("Europe/Moscow");

/*	
	Пример обращения к этому API
	http://localhost/Test_API/calc.php?value1=10&value2=5&target=plus
*/

try {

	if (isset($_GET["value1"]) && isset($_GET["value2"]) && isset($_GET["target"]))
	{
		$value1 = $_GET["value1"];
		$value2 = $_GET["value2"];
		$target = $_GET["target"];
		if ($target == 'plus') $result = $value1 + $value2;
		if ($target == 'minus') $result = $value1 - $value2;
		print('{"status":"PASSED", "result":'.$result.'}');
	}
	elseif (isset($_POST["value1"]) && isset($_POST["value2"]) && isset($_POST["target"]))
	{
		$value1 = $_POST["value1"];
		$value2 = $_POST["value2"];
		$target = $_POST["target"];
		if ($target == 'plus') $result = $value1 + $value2;
		if ($target == 'minus') $result = $value1 - $value2;
		print('{"status":"PASSED", "result":'.$result.'}');
	}
	else
	{
		print('{"status":"FAILED", "result": 0}');
	}
	

} catch (Exception $e) {
	print('{"status":"ERROR","message":"'.$e->getMessage().'"}');
}




?>