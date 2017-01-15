/*1.先获取所有的收藏按钮
 */

var oList=document.querySelectorAll(".list")[0];
var oBtn=document.querySelectorAll(".bt");
var oCount=document.getElementById("count");
var total=0;
//没有进行加入购物车的点击时，购物车的数量就应该显示
var str=cookieObjectFunction.getCookie("list");//获取的cookie此时是个键值，值就是我们存进去的数组
if(str){
	var arrValue=decodeURIComponent(str);//需要先解码
	console.log(arrValue);
	//转成对象，获得我们存进的数据，是个数组，里面存的是对象，包含每个商品的信息
	var arrData=JSON.parse(arrValue);
	console.log(arrData);
	
	//遍历数组，求数组中每个对象的arr[k].num属性值得和
	for(var k=0;k<arrData.length;k++){
		total+=arrData[k].num;
	}
}
oCount.innerHTML=total;

//用委托的方法去实现,点击事件加在最外面父元素
oList.onclick=function(e){
	var arr=[];//定义空数组，储存数据
	var _e=window.event||e;
	var _t=_e.target||_e.srcElement;
	if(_t.tagName.toLocaleLowerCase()=="button"){
//		for(var i=0;i<oBtn.length;i++){
//			oBtn[i].index=i;
//		}
		var parent=_t.parentNode.parentNode;//此时获得的是dl
		console.log(parent);
		var curId=parent.getAttribute("pid");//获取自定义属性,ID
		console.log(curId);
		var oSrc=parent.getElementsByTagName("img")[0].getAttribute("src");//获取图片的路径
		console.log(oSrc);
		var productName=parent.getElementsByTagName("dd")[0].innerHTML;
		var productDetail=parent.getElementsByTagName("dd")[1].innerHTML;
		console.log(productName);
		console.log(productDetail);
		var productPrice=parent.getElementsByTagName("dd")[2].innerText.substring(1);
		console.log(productPrice);
		var productobj ={
			id:curId,
			src:oSrc,
			name:productName,
			detail:productDetail,
			price:productPrice
		}
		//需要先获取cookie，如果cookie里面存的有，就++
		var str=cookieObjectFunction.getCookie("list");//获取的cookie此时是个键值，值就是我们存进去的数组
		console.log(str);
		if(str){//代表要找的cookie存在
			var arrValue=decodeURIComponent(str);//需要先解码
			console.log(arrValue);
			//转成对象，获得我们存进的数据，是个数组，里面存的是对象，包含每个商品的信息
			var arrData=JSON.parse(arrValue);
			console.log(arrData);
			//没有再给对象定义属性num
			var m=0;//记录是否等于arrData.length-1，如果等于，说明cookie里面没有存
			for(var j=0;j<arrData.length;j++){
				if(arrData[j].id==curId){//如果找到，则让则让arrData[i].num++，
					arrData[j].num++;
					break;//同时终止循环
				}
			}
			arr=arr.concat(arrData);//同时数据深度复制给arr，不然之前的会被覆盖
			m=j;
			if(m==arrData.length){
			//m==arrData.length，说明cookie里面没有存   ，需要把商品信息放进数组
				productobj.num=1;
				arr.push(productobj);//数组存储对象，存商品的信息
				console.log(arr);
			}
			
		}else{
			productobj.num=1;
			arr.push(productobj);//数组存储对象，存商品的信息
		    console.log(arr);
		}
		var total=0;
		//遍历数组，求数组中每个对象的arr[k].num属性值得和
		for(var k=0;k<arr.length;k++){
			total+=arr[k].num;
		}
		/*
		 * 每个商品的信息，都已经放到数组，
		 * 然后存到cookie中
		 */
		var date=new Date();
		date.setDate(date.getDate()+7);
		var obj={
			name:"list",
			value:JSON.stringify(arr),//需要转成字符串，才能存。cookie只能存字符串
			expires:date,
			path:"/"
		}
		//调用封装好的函数
		if(JSON.stringify(arr)!="[]"){
			cookieObjectFunction.setCookie(obj);//创建cookie
		}
		
		console.log(document.cookie);//
	}
	
	oCount.innerHTML=total;
}
