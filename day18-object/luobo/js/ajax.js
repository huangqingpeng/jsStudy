/*
   ajax函数封装
        传入的参数是对象，
        函数封装：整理一段代码块，把变化的东西抽取为参数（形参）
                          请求方式:get 或post
                          请求的路径：url
                          参数条件：参数名=值&参数名=值
                          是否异步：true   或false
                          异步请求的目的：拿到数据
                          处理数据的方式：1.会话成功    success    函数定义  都有一个形参   数据
                      2.会话失败   error     函数定义    都有一个形参   绘画状态    404 500 。。。
            参数对象：obj={
            	method："get"       或"post"    请求方式          string
            	url："http://xxxxxxxxxx80:/xxx.php"       string
            	isAnsyc:true        或false      bollean
            	urldata：{               //参数要转化成     参数名&值
            		参数名：值，                             url上的参数
            		参数名：值
            	}，
            	success：function(a){
            		成功时，处理函数,业务逻辑
            	}，
            	error：function(b){
            		成功时，处理函数,业务逻辑，返回状态码   404 500 
            	}
            }

*/

function ajax(obj){
	var xhr;
	//第一步
	if(window.XMLHttpRequest){//标准模式
		xhr=new XMLHttpRequest();
	}else{
		xhr=new ActiveXObject("Microsoft.XMLHTTP") ;//兼容ie6
	}
	//第二步 、第三步
	if(obj.method=="get"){//get方式
		var date=new Date();
		var param=date.getTime();//处理get方式的缓存，，毫秒数时刻是在变得
		//把要请求上传的数据转化为 ：参数名=值&参数名=值，的格式的string；
		var str=handeler(obj.urldata);
		xhr.open("get",obj.url+"?time="+param+"&"+str,obj.isAnsyc);
		xhr.send();
	}else{//post方式
		var str=handeler(obj.urldata);
		xhr.open("post",obj.url,obj.isAnsyc);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(str);
	}
	//第四步
	if(obj.isAnsyc){//true  异步
		xhr.onreadystatechange=function(){//监听状态变化
			if(xhr.readyState==4){//数据拿回来了，读取完成
			    if(xhr.status==200){//成功   读取成功
			    	var data=xhr.responseText;
			    	obj.success(data);//执行成功的业务逻辑
			    }else{
			    	var data=xhr.responseText;
			    	obj.error(data);//执行失败的业务逻辑
			    }
			}
		}
	}else{//同步
		if(xhr.readyState==4){//数据拿回来了
		    if(xhr.status==200){//成功
		    	var data=xhr.responseText;
		    	obj.success(data);//执行成功的业务逻辑
		    }else{
		    	var data=xhr.responseText;
		    	obj.error(data);//执行失败的业务逻辑
		    }
		}
	}
	/*
	    功能：将一个对象转化为           参数名=值&参数名=值，的格式
	 * */
	function handeler(obj){
		var arr=[];
		for(var key in obj){
			var str=key + "=" + obj[key];
			arr.push(str);
		}
		return arr.join("&");//返回转化后的字符串
	}
	
	
}
