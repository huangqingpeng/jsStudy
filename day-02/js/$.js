/*
 选择器函数
 */
function $(selector){
	if(selector.indexOf("#")==0){
		//id选择器
		return document.getElementById(selector.substring(1));
	}else if(selector.indexOf(".")==0){
		//class选择器
		return document.getElementsByClassName(selector.substring(1));
	}else{
		//元素选择器
		return document.getElementsByTagName(selector);
	}
}

/*
 * 检查是不是数字的函数
 */
function checkNum(arguments){
				var n=arguments;
				for(var i=0;i<n.length;i++){
					if(isNaN(n[i])){
					    return false;
				    }
					if(n.length==0){
					  return false;
				    }
				}
				 return true;
			}