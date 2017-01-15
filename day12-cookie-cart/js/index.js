/*1.先获取所有的收藏按钮
 */

var oList=document.querySelectorAll(".list")[0];
var oBtn=document.querySelectorAll(".bt");
var oCount=document.getElementById("ccount");

oCount.innerHTML=totalGoods();
oList.onclick=function(e){
	//var arr=[];//定义空数组，储存数据
	var _e=window.event||e;
	var _t=_e.target||_e.srcElement;
	if(_t.tagName.toLocaleLowerCase()=="button"){
		var dl=_t.parentNode.parentNode;//此时获得的是dl
		console.log(dl);
		var curId=dl.getAttribute("pid");//获取自定义属性,ID
	    var flag=checkId(curId)
	    if(flag){//本地有cookie存数据有curId，则执行，调用函数upJsonDate(curId,1);
	     	upJsonDate(curId,1);
	    }else{//本地有cookie存数据没有有curId，没有则执行
	     	var imgSrc=dl.firstElementChild.firstElementChild.src;
	     	var name=dl.children[1].innerHTML;
	     	var dsc=dl.children[2].innerHTML;
	     	var price=dl.children[3].firstElementChild.innerHTML;
	     	var obj={
	     		id:curId,
	     		name:name,
	     		dsc:dsc,
	     		price:price,
	     		count:1,
	     		src:imgSrc
	     	}
	     	//需要添加到本地cookie，调用函数
	     	addCookie(obj);
	    }
	    oCount.innerHTML=totalGoods();//更新商品总量,调用函数totalGoods
	}
}
