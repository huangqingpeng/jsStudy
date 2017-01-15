 /*
  * cookie 增 ，删，改，查
  * 完整形式：[]中是可选项
  语法：document.cookie  = “name=value[;expires=date][;path=path-to-resource][;domain=域名][;secure]”

  */

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
 function setCookie(object){
 	//cookie的名字和值，需要编码，存储
 	var str=encodeURIComponent(object.name)+ "=" +encodeURIComponent(object.value);
 	if(object.expires){//是否有时间限定
 		str+=";expires="+object.expires;
 	}
 	if(object.path){//是否有路径限定
 		str+=";path="+object.path;
 	}
 	if(object.domain){//是否有域名限制
 		str+=";domain="+object.domain;
 	}
 	if(object.secure){//是否有安全限制
 		str+=";secure";
 	}
 	document.cookie=str;
 }
 
 
/*
 * 函数的名字delCookie
 * cookie的删除
 */
function delCookie(key){
	var date=new Date();
	date.setDate(date.getDate()-1);
	var obj={
		name:key,
		value:"",
		expires:date
	}
	setCookie(obj);
}

/*
 * 函数名字getCookie
 * cookie的值获取
*/
function getCookie(key){
	var str=document.cookie;
	var arr=str.split("; ");//字符串的分割成数组
	for(var i=0;i<arr.length;i++){
		var arr1=arr[i].split("=");//数组中每个元素也都是字符串，然后在分割成数组
		if(key==decodeURIComponent(arr1[0])){
			//arr1[0]是key
			return arr1[1];//返回每个key所对应的值
		}
	}
	var result="没有找到";
	return result;
}
