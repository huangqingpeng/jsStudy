var  oBox=document.getElementById("box");
var  oH2=document.getElementById("h2");
var  oContainer=document.getElementsByClassName("container")[0];
var  oTb=document.getElementById("table");
var  oThead=document.querySelectorAll("thead")[0];
var  oTbody=document.getElementById("tbody");
var  totalPrice=document.getElementById("totalPrice");
var  allCheck=document.getElementById("allCheck");
var  check=document.getElementsByClassName("ck");

var arrValue;//全局变量，cookie值
var arrData;//全局变量，解码后变成数组，且里面存的每个元素都是对象
//首先获取cookie值，cookie值存在，则需要渲染在页面，如果没有，购物车显示为空
var str=cookieObjectFunction.getCookie("list");
console.log(decodeURIComponent(str));
arrValue = decodeURIComponent(str);//需要先解码
console.log(arrValue);
console.log(typeof arrValue);
if(arrValue=="[]"){
	arrValue=false;
}
//获取的cookie此时是个键值，值就是我们存进去的数组，数组里面是对象，但是数组需要先解码
if(arrValue){
	oBox.className="box hide";
//	oH2.className="hide";
	oTb.className="";
	//转成对象，获得我们存进的数据，是个数组，里面存的是对象，包含每个商品的信息
	arrData = JSON.parse(arrValue);
	console.log(arrData);
	//渲染数据，调用函数
	showData(arrData);
	
	//删除页面的内容，同时也需要把cookie中的数据给删除，调用函数
	delProduct();
	
	//修改单一商品的数量，调用函数
	addProduct();
	//勾选全选商品，调用函数
	checkAll();
	//checkone();
}else{//如果没有，购物车显示为空,table隐藏
	oBox.className="box";
//	oH2.className="";
	oTb.className="hide";
}

//arr为数组，遍历cookie数据，把添加的商品在购物车内显示
function showData(arr){
	for(var i=0;i<arr.length;i++){
		//动态创建tr
		//alert(1);
		var oTr=document.createElement("tr");
		oTr["lang"]=arr[i].id;
		console.log(oTr);
		//遍历数组中每个对象
		oTr.innerHTML='<td><input type="checkbox" class="ck"/></td>'+
						'<td><img src='+arr[i].src+' alt="" /></td>'+
						'<td>'+ arr[i].detail +'</td>' +
						'<td><button class="down">-'+
						'</button><input type="text" value='+ arr[i].num+' readonly="readonly" />'+
						'<button class="up">+</button>'+
						'</td><td>￥<span>'+arr[i].price +'</span></td><td>￥<span>'+ arr[i].num*arr[i].price+'</span>'+
						'</td><td><button class="del" lang='+ arr[i].id+'  >删除</button></td>'
	     oTbody.appendChild(oTr);
	}
	totalPrice.innerHTML=totalNumPrice(arr)//刚开始加载时，计算购物车商品总价total；调用函数
	
}


function delProduct(){
	//用委托写。委托在table
	oTbody.onclick=function(e){
		var _e=window.event||e;
		var _t=_e.target||_e.srcElement;
		if(_t.className=="del"){
			//删除页面的内容，同时也需要把cookie中的数据给删除
			var parent=_t.parentNode.parentNode;
			parent.parentNode.removeChild(parent);
			//遍历cookie的数据，找到和删除的lang属性相等的id值。则也同时从cookie存储数据中删除
			for(var j=0;j<arrData.length;j++){
				if(arrData[j].id==_t.getAttribute("lang")){
					arrData.splice(j,1);//数组中，删除相应的数据
				    //同时修改cookie，调用函数
		            setCookie(arrData);
				}
				break;
				//total+=arrData[j].num*arrData[j].price;
			}
			totalPrice.innerHTML=totalNumPrice(arrData);//点击删除按钮后,计算购物车商品总价total，调用函数
			
			if(totalNumPrice(arrData)==0){//购物车清空了
				alert("您确定要清空购物车？");
				oTb.className="hide";
				oBox.className="box";
				cookieObjectFunction.delCookie("list");//把cookie全部删除
			    console.log(decodeURIComponent(cookieObjectFunction.getCookie("list")));
			}
		}
	}
	
}


//参数是arr数组，计算购物车商品总价total
function totalNumPrice(arr){
	var total=0;//记录商品总价格
	for(var j=0;j<arr.length;j++){
		total+=arr[j].num*arr[j].price;
	}
	//totalPrice.innerHTML=total;
	return total;
}



//修改cookie内存储的数据，参数为arr数组
function setCookie(arr){
	//同时修改cookie
	var date=new Date();
    date.setDate(date.getDate()+7);
	var obj={
			name:"list",
			value:JSON.stringify(arr),//需要转成字符串，才能存。cookie只能存字符串
			expires:date,
			path:"/"
	}
	
	cookieObjectFunction.setCookie(obj);//修改cookie
}

/*
      点击添加商品，也就是classname==up或者classname==down的按钮，使相对应的商品增加；
      函数功能：修改商品的数量   
      同时需要改变的有： 1.购物车内商品总价格
                2.相对应商品数量、价格都要增加
                3.cookie里面存储的数据也要同时要修改
 * */
function addProduct(){
	//委托写，事件也委托在父级元素table上
	oTb.onclick=function(e){
		//valueNum为显示当前此件商品的数量，与cookie数据储存的数组中每个商品的obj.num相等
		var valueNum;
		var farth;
		var _e=window.event||e;
		var _t=_e.target||_e.srcElement;
		if(_t.className=="up"){
			valueNum=_t.previousSibling.value;
			console.log(valueNum);
			valueNum++;
			_t.previousSibling.value=valueNum;
			console.log(_t.value);
			farth=_t.parentNode.parentNode;
	     }
		if(_t.className=="down"){
			valueNum=_t.nextSibling.value;
			valueNum--;
			if(valueNum<1){
				valueNum=1;
				alert("商品不能小于1");
			}
			_t.nextSibling.value=valueNum;
			farth=_t.parentNode.parentNode;
		}
		/*先要获取cookie数据，然后修改，由于arrData是全局变量，故已经已经获取过
		 * 遍历arrData中每个对象，去修改相对应的arrData[i].num的属性值
		*/
		if(_t.className=="down"||_t.className=="up"){
			for(var k=0;k<arrData.length;k++){
				if(arrData[k].id==farth.getAttribute("lang")){
					arrData[k].num=valueNum;
					console.log(valueNum*arrData[k].price);
					var tds=farth.children;
					var oSpan=tds[5].children[0];
					//修改相对应的商品的总价格
					oSpan.innerHTML=valueNum*arrData[k].price;
					break;
				}
			}
			//修改购物车内商品的总价格。，调用函数
			totalPrice.innerHTML=totalNumPrice(arrData);
			//直接修改cookie数据，调用函数
			setCookie(arrData);
		}
		
	}
}



/*    点击全选按钮；触发的函数，将发生以下变化；
 *   1.每个商品前面的check都被选中
 *   2.购物车的总价格显示的是被选中的所有商品的总价格之和
 *   
 **/
function checkAll(){//全选功能。默认是全选
	allCheck["checked"]=true;
	for(var i=0;i<check.length;i++){
		check[i]["checked"]=allCheck["checked"];
	}
	allCheck.onclick=function(){
		console.log(this);
		for(var i=0;i<check.length;i++){
			check[i]["checked"]=allCheck["checked"];
		}
		if(!allCheck["checked"]){
			totalPrice.innerHTML=0;
		}else{
			totalPrice.innerHTML=totalNumPrice(arrData);
		}
	}
}
	
//部分沟选
function checkone(){
	var num=0;
	//修改相对应的商品的总价格
	//oSpan.innerHTML=valueNum*arrData[k].price;
	for(var i=1;i<check.length;i++){
		check[i].onclick=function(){
			if(check[i]["checked"]){
				var farther=check[i].parentNode.parentNode;//tr
				var tds=farther.children;
				console.log(tds);
		    	var oSpan=tds[5].children[0];
		    	console.log(oSpan);
		    	num+=parseInt(oSpan.innerHTML);
		    	console.log(num);
			}
			totalPrice.innerHTML=num;
		}
	}
	
	
}
