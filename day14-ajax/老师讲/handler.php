<?php
	//  单行注释
	/*多行注释*/  
	
	/*
	 	$变量名 = 数据
	 	
	 	数据类型：
	     	  数字      1   2   3
	                         字符串    "abvc"    'abc'
	                        布尔值      true     false
	    
	            语句
	       	选择语句   if    if-else   if-else if    switch
	 		循环语句    while    do-while       for
	 	
	 	运算符：
	 		赋值运算符：  =   +=  -= *=  /= %=
	 		算术运算符：  + - * / %
	 		逻辑运算符：   &&   ||   ！
	 		比较运算符：   ==   ===   >  <   >=  <= !=  ！==
	 
	 
	            接收客户端所发送的参数
	 	    $_GET["参数名"]   -》  get请求
	        $_POST["参数名"]   -》 post请求
	 	
	 	php向客户端返回内容的命令是
	 		echo  数据;
	 	
	 	
	 */ 
	 
//	 $name = $_GET["uName"];  //用户名
//	 $p = $_GET["pd"];
	 $name = $_POST["uName"];  //用户名
	 $p = $_POST["pd"];
	 
	 //用户名   admin    密码 是    1314520
	 //echo $name;
	 
	 if($name=="admin"&&$p=="1314520"){
	 	echo "1";
	 }else{
	 	echo "0";
	 }
	 
	 
	 
	 
	 
	 
	 
	 
	 
	

?>