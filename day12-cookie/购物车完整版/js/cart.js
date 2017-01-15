var  oBox=document.getElementById("box");
var  oTb=document.getElementById("table");
var  oThead=document.querySelectorAll("thead")[0];
var  oTbody=document.getElementById("tbody");
var  totalPrice=document.getElementById("totalPrice");
var  allCheck=document.getElementById("allCheck");


tableshow();//渲染时，先判断table是否显示

/*
              功能：判断table的显示与隐藏
              1.当商品总计为0时，让table  的类名为hidden，box类名为box
              2.当商品总计大于0时，让table  的类名为空，box类名为box  hidden
 * */
function  tableshow(){
	//获取商品的总数量
	var total=totalGoods();
	if(total){//商品总计不为0时
		oBox.className="box hide";
		oTb.className="";
	}else{
		oBox.className="box";
		oTb.className="hide";
	}
}

//arr为数组，遍历cookie数据，把添加的商品在购物车内显示
//function showData(arr){
	var arr=getCookieJsonarr();
	for(var i=0;i<arr.length;i++){
		//动态创建tr
		//alert(1);
		var oTr=document.createElement("tr");
		//给每个tr 人为添加一个属性 lang   让属性值为每个商品的id，商品的编号
		oTr["lang"]=arr[i].id;
		console.log(oTr);
		//遍历数组中每个对象
		oTr.innerHTML='<td><input type="checkbox" class="ck"/></td>'+
						'<td><img src='+arr[i].src+' alt="" /></td>'+
						'<td>'+ arr[i].dsc +'</td>' +
						'<td><button class="down">-'+
						'</button><input type="text" value='+ arr[i].count+' readonly="readonly" />'+
						'<button class="up">+</button>'+
						'</td><td>￥<span>'+arr[i].price +'</span></td><td>￥<span>'+ arr[i].count*arr[i].price+'</span>'+
						'</td><td><button class="del" lang='+ arr[i].id+'  >删除</button></td>'
	     oTbody.appendChild(oTr);
	}
	
//}


/*
                 功能：计算购物车内的商品的总价格
 * */
function getTotalPrice(){
	var cks=document.querySelectorAll("tbody .ck");
	var sum=0;
	for(var i=0;i<cks.length;i++){
		//cks[i].checked为true,表示被选中
		if(cks[i].checked){
			var tr=cks[i].parentNode.parentNode;
			var priceNum=Number(tr.children[5].firstElementChild.innerHTML);
			sum+=priceNum;
		}
	}
	 totalPrice.innerHTML=sum;//购物车总价格显示出来
}

/*
    功能：给tbody内的每个单选框添加事件
     1。当被选中时，就把该商品的总价格计入购物车商品总价格中
 * */
oTbody.onchange=function(e){
	//事件委托在tbody上
	var _e=window.event||e;
	var _t=_e.target||_e.srcElement;
	if(_t.className=="ck"){
		//var tr=_t.parentNode.parentNode;
		checkBoxAll();
	}
}

/*
     功能：全选功能
     1. 当全选单选框被勾选时，tbody的单选框全部被勾选，totalPrice需要计算
     2. 当全选单选框没有被勾选时，tbody的单选框全部不勾选，totalPrice需要计算
 * */
allCheck.onchange=function(){
	var cks=document.querySelectorAll("tbody .ck");
	//遍历每个单选框，让每个单选框的状态和全选状态一样
	for(var i=0;i<cks.length;i++){
		//alert(1);
		cks[i].checked=this.checked;
	}
	getTotalPrice();//点击的全选框，需要计算购物车总价格
}


/*
    功能：DOM操作，删除购物车内的商品
    同时购物车内的总价格发生变化
    事件委托在tbody上
 * */

oTbody.onclick=function(e){
	//事件委托在tbody上
	var _e=window.event||e;
	var _t=_e.target||_e.srcElement;
	if(_t.className=="del"){//dom操作删除页面中数据
		var tr=_t.parentNode.parentNode;
		tbody.removeChild(tr);
		var curId=tr.getAttribute("lang");
	}
	//同时需要删除cookie中的相对应的对象，并更新到本地;调用函数delObjectById
	delObjectById(curId);
	getTotalPrice();//计算购物车内商品总价格
	//判断商品是否全部删除，如果全部删除，就要让table隐藏
	tableshow();
/*
           功能  1.点击“+”相对应商品的数量增加，相对应得商品总计增加
        2.点击“-”相对应商品的数量减少，相对应得商品总计减少
        3.相对应的单选框勾选，购物车的总价跟着变化
        4.同时更新本地cookie储存         
          事件委托在tbody上
 * */

	if(_t.className=="down"){//相对应的商品数量减少
		var tr=_t.parentNode.parentNode;
		var curId=tr.getAttribute("lang");
		//更新cookie储存数据，调用函数upJsonDate(id,num)
	  upJsonDate(curId,-1);
	  // 调用upNum(id)，取出相对应的商品数量
		var num= upNum(curId);
		//获取商品价格
		var price=Number(tr.children[4].firstElementChild.innerHTML);
		//商品数量显示在页面
		tr.children[3].children[1].value=num;
		//相对应商品总价显示在页面
		tr.children[5].firstElementChild.innerHTML=num*price;
		//相对应的单选框勾选
		tr.children[0].firstElementChild.checked=true;
  }
	if(_t.className=="up"){//相对应的商品数量减少
		var tr=_t.parentNode.parentNode;
		var curId=tr.getAttribute("lang");
		//var num=parseInt(tr.children[3].children[1].value);
		//更新cookie储存数据，调用函数upJsonDate(id,num)
	  upJsonDate(curId,1);
	  // 调用upNum(id)，取出相对应的商品数量
		var num= upNum(curId);
		//获取商品价格
		var price=Number(tr.children[4].firstElementChild.innerHTML);
		//商品数量显示在页面
		tr.children[3].children[1].value=num;
		//相对应商品总价显示在页面
		tr.children[5].firstElementChild.innerHTML=num*price;
		//相对应的单选框勾选
		tr.children[0].firstElementChild.checked=true;
 }
	//点击的单选框，需要计算购物车总价格
	getTotalPrice();
	//调用函数  ，判断全选按钮是否勾选
	checkBoxAll();
}

/*
     功能：判断每个商品的单选框是否全部选中
     1.全部选中                           全选按钮也要同时勾选
     2.只要有一个没有勾选        全选按钮都不勾选
 * */
function  checkBoxAll(){
	var cks=document.querySelectorAll("tbody .ck");
		var flag=true;
		//遍历每个单选框，只要有一个没有被选中，全选都不沟选
		for(var i=0;i<cks.length;i++){
			if(cks[i].checked==false){
				flag=false;
				break;
			}
		}
		allCheck.checked=flag;
}

