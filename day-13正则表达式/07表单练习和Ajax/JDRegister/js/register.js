/*--------------------------验证用户名操作------------------------------*/
//获取所要操作的节点对象
var userName = document.getElementById("userName");
userName.onfocus = checkUserName;

userName.onblur = checkUserName;

userName.onkeyup = checkUserName;

//返回boolean值 表示验证是否通过
function checkUserName(e){
	var _e = window.event||e;  //事件对象（可以用来保存当前正在执行的当前事件的信息）
	//_e.type   返回的是事件的名字
	var v = userName.value;  //当前用户名的内容
	var box = userName.parentNode;  //表单项
	var tip = box.nextElementSibling;  //提示信息项
	var span = tip.lastElementChild;   //span
	
	if(_e.type=="focus"){    //获取焦点
		if(v.length==0){  //空
			box.className = "box";
			tip.className = "tip default";
			span.innerHTML = "支持汉字、数字、字母、-、_的组合，4-20个字符";
		}
		
	}else if(_e.type=="blur"){    //失去焦点
		if(v.length==0){  //空
			box.className = "box";
			tip.className = "tip hide";
		}
	}else{   //用户输入时
		if(v.length==0){  //用户名为空
			box.className = "box error";
			tip.className = "tip error";
			span.innerHTML = "请输入用户名";
		}else{ //用户名不为空
			var reg = /^[\u4e00-\u9fa5\w-]+$/;  //验证用户名的格式
			if(reg.test(v)){  //格式正确
				if(v.length>=4&&v.length<=20){  //长度符合
					 box.className = "box right";
					 tip.className = "tip hide";
					 return true;
				}else{  //长度不符合
					box.className = "box error";
					tip.className = "tip error";
					span.innerHTML = "长度4-20个字符";
				}
			}else{  //格式不正确
				box.className = "box error";
				tip.className = "tip error";
				span.innerHTML = " 格式错误，仅支持汉字、字母、数字、“-”“_”的组合，4-20个字符";
			}
		}
		
	}
	
	
}



/*--------------------------验证密码操作------------------------------*/



/*-------------------------点击注册时---------------------------------*/
var btn = document.getElementById("btn");
btn.onclick = function(){
	if(checkUserName()){
		alert("可以注册")
	}
}
































