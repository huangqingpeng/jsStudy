产品经理：
	设计产品  （产品已经定义好）（需求定义好）

开发部：
		项目主管（人）
		设计架构（人） 
		【服务端（写接口，写处理数据的程序->操作数据库）   -》接口    json数据
		前端（PC端   webApp h5 混合app  ->获取到服务端所给的数据  包装数据）-》自己模拟数据  】
		UI设计（切图  还原产品（html,css））->静态模板
		//安卓   10
		//ios 10
		测试	（不懂代码）
			bug    bug系统 -> (禅道)         

上线	
	把项目部署到服务器
	


服务端   -》数据库
数据库-》存放数据 -》表
如：瀑布流
图片信息表：（存放了成千上万条数据）
图片的编号，图片的路径，图片的描述  ......
10001    1.jpg    XXX
...

按需加载
分页


怎么来模拟数据？
	用json字符串
	var str = "[]";
	var str = "{'键名':值}"
	var str = '["1.jpg","2.jpg"...]'
	JSON.parse()
	JSON.stringify()
	
对于模拟数据，是为了将来【请求】服务端而模拟的。
AJAX
所以针对所模拟的数据，要以文件的形式表现。     data.json           请求-》data.json

针对瀑布流获取数据的接口就是：
http://127.0.0.1:8020/1216Code/demo01/data.json?page=3

{"data":["0.jpg","1.jpg"],"totalPage":38}





1    2    3    4   5...



跨域请求资源：
	我电脑：
	127.0.0.1:8020         HBuilder中内置的服务器
	127.0.0.1:8989         WAMP中apache服务器
	
	两个服务器域名或者ip(ip+端口) 是不一样的


    项目web01   部署在127.0.0.1:8020     
  
    项目web02   部署在127.0.0.1:8989  
    
     需求：
     web01中去请求图片资源，图片资源在web02中
  
	  跨域：
	  	从一个ip地址（ip+端口号）去请求另个一个ip（ip+端口号）地址下的资源            这种现象称为  【跨域】
  	
	 问题：
	 	AJAX(XMLHTTPRequest)无法实现跨域请求资源
	原因：
		同源策略    同源，在同一个ip地址（ip+端口号）下
		策略：约定，制定
		浏览器厂商所制定
		要用【AJAX】请求资源，必须得同源
		为什么制定同源策略：    安全（数据安全）
		
	跨域请求：
		AJAX不能使用
		JSONP的方式能够实现跨域请求
		
		谁能够实现跨域请求：
			图片标签
			link标签
			script标签
		
		JSONP
			JSONP(JSON with Padding)是JSON的一种“使用模式”，可用于解决主流浏览器的跨域数据访问的问题。由于同源策略，一般来说位于 server1.example.com 的网页无法与不是 server1.example.com的服务器沟通，而 HTML 的<script> 元素是一个例外。利用 <script> 元素的这个开放策略，网页可以得到从其他来源动态产生的 JSON 资料，而这种使用模式就是所谓的 JSONP。用 JSONP 抓到的资料并不是 JSON，而是任意的JavaScript，用 JavaScript 直译器执行而不是用 JSON 解析器解析。
			



需求：
	JSONP可以实现跨域
	在一个web01ip地址下的某个文件中定义一个函数，并且这个函数有一个形参来代表将来的实际的数据
	在另一个web02ip地址下一个文件中返回一个结果：定义的函数名(数据);
	
	问题：若web01中的定义的函数名发生改变，web02中的函数调用的名字也要改变（手动)
	
	目的：web01中定义的函数名发生改变，web02中的函数调用的名字【自动】发生改变
	
	怎么实现？
		web02用后端程序来处理web01中请求       后端程序  php
		
		


session   页面之间如何传值       cookie(服务端和客户端都能创建和使用)   session（可以在服务端创建和使用） php
在php中使用seesion必须得先启动session       
	//启动seesion
	session_start(); 

	//使用方式
	$_SESSION["键名"] = 值;   //创建一个session
	
	$_SESSION["键名"]         //得到session里的值
	
	//echo   可以输入任何数据





















