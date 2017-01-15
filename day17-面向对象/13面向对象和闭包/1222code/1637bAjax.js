/*
 	函数
 	对象
 	封装：整理一段代码块，把变化的东西抽取为参数（形参）
 		请求方式（get  post）
 		请求的路径(url)
 		参数条件    参数名=值&参数名=值
 		是否异步   true false
 	异步请求的目的：拿到数据
 		处理数据的方式（会话失败）  success   函数定义   都有一个形参           数据
 		会话失败                                     error     函数定义 都有一个形参            会话的状态    404  500
 		
 	参数：对象 o={
 		method:"get"   //"post"  请求方式             string
 		url:"http://xxx.xxx.xx:80/xxx.php" string
 		isAsyc:true     //false            boolean
 		//data: "参数名&值"
 		data:{参数名:值,参数名:值,参数名:值,参数名:值}     参数名&值
 		success:function(a){   a就代表将来所接收到的数据
 			//
 		}，
 		error:function(b){    b就带表  404  500 3...
 			//
 		}
 	}
 		
 		
 */
function ajax(o){
	//第一步
	var xhr;  //代表AJAX对象
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();  //标准
	}else{
		xhr = new ActiveXObject("Microsoft.XMLHTTP");  //IE6
	}
	
	//第二步 和 第三步
	var date = new Date();
	var time = date.getTime();
	var parmater = HandlerData(o.data);   //参数名=值&参数名=值&参数名=值&参数名=值&参数名=值
	if(o.method.toLowerCase()=="get"){
		xhr.open("get",o.url + "?new=" + time + "&" + parmater,o.isAsyc);
		xhr.send();
	}else{
		xhr.open("post",o.url,o.isAsyc);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');   //模拟表单体的方式提交
		xhr.send(parmater);
	}
	
	//第四步：
	if(o.isAsyc){ //异步
		xhr.onreadystatechange = function(){
			if(xhr.readyState==4){
				if(xhr.status==200){ //ok  200  //会话成功
					o.success(xhr.responseText);
				}else{  //no   404  500 ...    //会话失败
					o.error(xhr.status);
				}
			}
		}
	}else{ //同步
		if(xhr.readyState==4){
				if(xhr.status==200){ //ok
					o.success(xhr.responseText);
				}else{  //no
					o.error(xhr.status);
				}
		}
	}
	
}


/*
 data:{参数名:值,参数名:值,参数名:值,参数名:值}   =>  "参数名=值&参数名=值..."
*/
function HandlerData(data){
	//  for  in 
	//join("&")
	var arr = [];
	for(var key in data){
		//key 就是参数名
		//data[key]  值
		var item = key + "=" + data[key]     //  "参数名=值"
		arr.push(item);
	}
	var str = arr.join("&")     //参数名=值&参数名=值&参数名=值&参数名=值&参数名=值
	return str;
}











































