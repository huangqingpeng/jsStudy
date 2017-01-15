/*
 	设置
 	删除
 	查找
 	document.cookie  = “name=value[;expires=date][;path=path-to-resource][;domain=域名][;secure]”
			
 */

/*
 	设置
 	参数：o 是对象
 		name:"cookie的名称",  必填
 		value:"cookie的值",  必填
 		expires:时间对象                可选
 		path:"路径"		   可选  
 		domain:"域名"     可选
 		secure:boolean值    可选
 		
 */
function setCookie(o) {
	var cookieStr = encodeURIComponent(o.name) + "=" + encodeURIComponent(o.value);

	if (o.expires) { //是否有时间限定
		cookieStr = cookieStr + ";expires=" + o.expires;
	}

	if (o.path) { //是否有时间限定
		cookieStr = cookieStr + ";path=" + o.path;
	}

	if (o.domain) { //是否有时间限定
		cookieStr = cookieStr + ";domain=" + o.domain;
	}

	if (o.secure) { //是否有时间限定
		cookieStr = cookieStr + ";secure";
	}

	document.cookie = cookieStr;
}

/*
 	功能：删除
 	参数：key
 		cookie的名称
 */
function deleteCookie(key) {
	var date = new Date();
	date.setDate(date.getDate() - 1);
	setCookie({
		name: key,
		value: '',
		expires: date
	})
}

/*
			 	创建一个工具，根据cookie的[名称]获取对应的值
			 */

function getCookie(n) {
	//userName=vipengpeng@163.com; pwd=1314520; gender=man
	var strs = document.cookie; //字符串
	var arr = strs.split("; ");
	//["userName=vipengpeng@163.com", "pwd=1314520", "gender=man"]

	for (var i = 0, len = arr.length; i < len; i++) {
		//arr[i]      //  key=value
		var kv = arr[i].split("="); //["key","vlaue"]
		
		if (n == decodeURIComponent(kv[0])) {
			//return 结束函数并返回值
			return decodeURIComponent(kv[1])
		}

	}
	
	return '';

}