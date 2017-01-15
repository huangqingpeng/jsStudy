/*
 	功能：
 		点击【添加购物车】
 			1. 若本地没有该商品，则创建对象组织对应的商品信息，添加到本地
 			2. 若本地存有该商品，则取出该商品更改改商品的数量+1
 		
 		计算本地商品的总数量
 		
 	思路：
 		第一步：获取所要操作的节点对象
 		第二步：给【添加购物车】绑定点击事件    绑定的方式（事件委托）
 		第三步：添加购物车
 			   
 			1. 若本地没有该商品，则创建对象组织对应的商品信息，添加到本地
 			2. 若本地存有该商品，则取出该商品更改改商品的数量+1
 			找到对应商品的pid
 			获取本地数据，用pid去检测本地【是否已经含有该商品】
 			
 			
 */

var ccount  = document.getElementById("ccount");  //描述总数量的节点对象
var list = document.getElementById("list");      //商品列表总节点对象

ccount.innerHTML = getTotal();   //这里的数量是页面加载时，所获取的本地的商品的数量

list.onclick = function(e){
	var _e = window.event||e; //事件对象
	var _t = _e.target||_e.srcElement; //被触发的节点对象
	
	if(_t.tagName.toLowerCase()=="button"){   //添加购物车按钮
		var dl = _t.parentNode.parentNode;   //dl
		var pid = dl.getAttribute("pid");    //获取自定义属性  pid对应值
		var flag = isHasGoodsById(pid);
		if(flag){ //有
			upadateCountById(pid,1); //更新本地对应商品的数量count
		}else{  //没有
			var pName = dl.children[1].innerHTML;  //商品的名称
			var imgSrc = dl.firstElementChild.firstElementChild.src;  //商品的图片路径
			var desc = dl.children[2].innerHTML;  //商品的描述
			var price = dl.children[3].firstElementChild.innerHTML;  //商品的描述
			/*
			 	商品的信息用对象组织好了
			 */
			var obj = {
				pid:pid,
				pName:pName,
				imgSrc:imgSrc,
				desc:desc,
				price:price,
				count:1
			}
			/*添加数据到 本地*/
			 addGoods(obj);
			
			
		}
		
		ccount.innerHTML = getTotal();  //更新显示的数量
	}
}

























