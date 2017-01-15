<?php
$name=$_GET["name"];//get方式
$password=$_GET["pwd"];

//$name=$_POST["name"];//post方式 
//$password=$_POST["pwd"];

if($name=="hqp123"&&$password=="123456"){
	echo "success";
}else{
	echo "error";
}
?>