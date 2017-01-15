/*
 	思路：
 		第一步：获取所要操作的节点对象
 		第二步：为小盒子绑定onmouseenter和onmouseleave事件
 		第三步：为小盒子绑定onmousemove事件
 			
 				
 		
 */

var smallBox = document.getElementById("smallBox"); //小盒子
var tool = document.getElementById("tool"); //小黄盒子
var bigBox = document.getElementById("bigBox"); //大盒子
var bigImg = document.getElementById("bigImg"); //大图片

smallBox.onmouseenter = function(){
	tool.className = "tool active";
	bigBox.className = "big-box active";
}

smallBox.onmouseleave = function(){
	tool.className = "tool";
	bigBox.className = "big-box";
}


smallBox.onmousemove = function(e){
	var _e = window.event||e;
	//var x = _e.offsetX;  有问题
	var x = _e.clientX - smallBox.offsetLeft - tool.offsetWidth/2;
	var y = _e.clientY - smallBox.offsetTop - tool.offsetHeight/2;
	
	if(x<0){
		x = 0;
	}
	if(x>smallBox.offsetWidth-tool.offsetWidth){
		x = smallBox.offsetWidth-tool.offsetWidth;
	}
	if(y<0){
		y = 0;
	}
	if(y>smallBox.offsetHeight-tool.offsetHeight){
		y = smallBox.offsetHeight-tool.offsetHeight;
	}
	
	/**/
	tool.style.left = x + "px";
	tool.style.top =  y + "px";
	
	bigImg.style.left = -x*4 + "px";
	bigImg.style.top = -y*4 + "px";
	
	
	
}

