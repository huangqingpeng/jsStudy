/*
 	思路：
 		第一步：获取所要操作的节点对象
 		第二步：为window绑定一个onscroll事件
 			  检测滚动条是否滚到底部
 			 若滚到底部：
 			 	请求数据
 		
 		第三步：追加图片到列中
 			  先找到高度最小的列
 			 把得到的数据中的一张添加到最小高度的列中
 		
 		备注：
 			若是根据数据来实现dom操作，必须得等数据加载完后，才能够执行dom操作的程序。
 		
 */
var cols = document.querySelectorAll(".col");  //获取一组列      伪数组 像数组一样使用，遍历，可以通过索引来获取其中的某个元素，但是不能够使用真正数组特有的工具
var path = "http://127.0.0.1:8020/1216Code/demo01/images/";
window.onscroll = function(){
	var pageHeight = document.body.scrollHeight;  //文档的高度
	var cHeight = document.body.clientHeight;     //浏览器可视区域的高度
	var sHeight = document.body.scrollTop||document.documentElement.scrollTop; //被卷去的页面的高度或者滚动条距离顶部的高度
	document.title = (cHeight+sHeight) + "--" + pageHeight
	if(cHeight+sHeight==pageHeight){
//		alert("滚动条到底部了")
		ajax({
			method:"get",
			url:"http://127.0.0.1:8020/1216Code/demo01/data.json",
			isAsyc:true,
			success:function(data){  //会话成功
				//console.log(data)   data 代表字符串形式的数组
				//console.log(typeof data)
				var arr = JSON.parse(data);
				console.log(arr)
				console.log(typeof arr)
				//getMinHeightCol()
				for(var i = 0;i<arr.length;i++){
					var minCol = getMinHeightCol();
					var imgSrc = path + arr[i];
					var div = document.createElement("div");
					div.className = "box";
					div.innerHTML = '<img src="'+imgSrc+'"  />';
					minCol.appendChild(div);
				}
				
			},
			error:function(message){  //会话失败
				alert(message);
			}
		})
	}
	
}



function  getMinHeightCol(){
	//console.log(cols instanceof Array)
	var minItem = cols[0];
	for(var i = 0,len = cols.length;i<len;i++){
		if(cols[i].offsetHeight<minItem.offsetHeight){
			minItem = cols[i];
		}
	}
	return minItem;
	
}





















