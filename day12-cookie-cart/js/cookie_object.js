//储存Cookie的增删，改查的对象
var cookieObjectFunction={
	/*函数名称：setCookie
	 * cookie的设置,包括  增加、修改
	 * 参数为：object对象；需要设置以下属性
	 *       name:"字符串 "               必须设置
	 *       value:"字符串 "              必须设置
	 *       expires:"保存期限" 为时间对象      可不设
	 *       path："可以打开的路径"         可不设
	 *       domain："域名"              可不设
	 *       secure:true                可不设
	 */
	setCookie:function(object){
		//cookie的名字和值，需要编码，存储
	 	var str=encodeURIComponent(object.name)+ "=" +encodeURIComponent(object.value);
	 	if(object.expires){//是否有时间限定
	 		str+=";expires="+object.expires;
	 	}
	 	if(object.path){//是否有路径限定
	 		str+=";path="+object.path;
	 	}
	 	if(object.domain){//是否有域名限制
	 		str+=";="+object.domain;
	 	}
	 	if(object.secure){//是否有安全限制
	 		str+=";secure";
	 	}
	 	document.cookie=str;
	},
	
	/*
	 * 函数的名字delCookie
	 * 参数为key
	 * cookie的删除
	 */
	delCookie:function(key){
		var date=new Date();
		date.setDate(date.getDate()-1);
		var obj={
			name:key,
			value:"",
			expires:date
		}
		this.setCookie(obj);//调用对 象自身的属性
	},
	
	/*
	 * 函数名字getCookie
	 * cookie的值获取
	*/
	getCookie:function(key){
		var str=document.cookie;
		var arr=str.split("; ");//字符串的分割成数组
		for(var i=0;i<arr.length;i++){
			var arr1=arr[i].split("=");//数组中每个元素也都是字符串，然后在分割成数组
			if(key==decodeURIComponent(arr1[0])){
				var arr=decodeURIComponent(arr1[1]);
				return arr;//返回每个key所对应的值
			}
		}
		var result=null;
		return result;
	}
	
}

