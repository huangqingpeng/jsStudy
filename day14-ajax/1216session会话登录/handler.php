<?php 
	//启动seesion
	session_start(); 
?>
<?php
	/*这个php程序用来校验登录*/	
	$u = $_POST["uName"];   //用户名
	$p = $_POST["pd"];      //密码
	
	//admin    111111
	if($u=="admin"&&$p=="111111"){  //登录成功
		$_SESSION["uName"] = "admin";
		echo "1";
	
	}else{//登录失败
		echo "0";
	}
?>