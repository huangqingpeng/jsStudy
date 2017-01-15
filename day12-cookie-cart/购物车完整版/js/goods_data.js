/*
         处理数据函数，
        功能：查看本地cookie是否存储有curId的数据
  */
 function  checkId(id){
 	var jsonarr=getCookieJsonarr();//转化为数组对象,调用函数getCookieJsonarr；
 	for(var i=0;i<jsonarr.length;i++){
 		if(id==jsonarr[i].id){
 			return true;
 		}
 	}
 	return false;
 }

/*
 功能：获取cookie里数据，并返回数组对象
 * */
function getCookieJsonarr(){
	//获取本地cookie，名称为list,为string类型
 	var jsonstr=cookieObjectFunction.getCookie("list");
 	if(!jsonstr){//本地没有，则创建
 	    var date=new Date();
 	    date.setDate(date.getDate()+7);
 	    var obj={
 	    	name:"list",
 	    	value:"[]",
 	    	expires:date
 	    }
 		cookieObjectFunction.setCookie(obj);//创建cookie
 	}
 	var jsonstr=cookieObjectFunction.getCookie("list");
 	console.log(jsonstr);
 	var arr=JSON.parse(jsonstr);
 	console.log(typeof arr);
 	return arr;//返回数组对象
}

/*
 功能：修改本地cookie数据
 参数obj为对象
 * */

function addCookie(o){
	var arr=getCookieJsonarr();
	arr.push(o);//把商品放到数组里，添加到本地
	var str=JSON.stringify(arr);
	var date=new Date();
 	date.setDate(date.getDate()+7);
 	 var obj={
 	    	name:"list",
 	    	value:str,
 	    	expires:date
 	   }
	cookieObjectFunction.setCookie(obj);//创建cookie，储存到本地
}


/*
 功能：计算商品的总量total
 * */
function totalGoods(){
	var sum=0;//计算商品的总数量
	var arr=getCookieJsonarr();//获取cookie数据为数组对象
	console.log(arr);
	console.log(typeof arr);
	for(var i=0;i<arr.length;i++){
		console.log(arr[i]);
		sum+=arr[i].count;
	}
	console.log(sum);
	console.log(arr);
	return sum;
}


/*
 功能：如果有curId,更新cookie数据
 参数 ：id 为商品的编号   ；     num  为商品是增加还是减少
 * */
function upJsonDate(id,num){
	var arr=getCookieJsonarr();//获取cookie数据为数组对象
	for(var i=0;i<arr.length;i++){
		if(id==arr[i].id){
			arr[i].count=arr[i].count+num;
			if(arr[i].count<1){
				arr[i].count=1;
			}
			break;
		}
	}
	console.log(arr);
	var str=JSON.stringify(arr);
	var date=new Date();
 	date.setDate(date.getDate()+7);
 	var obj={
 	    	name:"list",
 	    	value:str,
 	    	expires:date
 	   }
	cookieObjectFunction.setCookie(obj);//修改cookie，储存到本地
}

/*
     功能：传入 id商品编号   删除相对应的cookie内的数据
     同时并更新本地cookie
 * */

function delObjectById(id){
	//首先要获取本地cookie数据
	var arr=getCookieJsonarr();//获取cookie数据为数组对象
	for(var i=0;i<arr.length;i++){
		if(id==arr[i].id){
			arr.splice(i,1);
			break;
		}
	}
	console.log(arr);
	var str=JSON.stringify(arr);
	var date=new Date();
 	date.setDate(date.getDate()+7);
 	var obj={
 	    	name:"list",
 	    	value:str,
 	    	expires:date
 	   }
	cookieObjectFunction.setCookie(obj);//修改cookie，储存到本地
	
}


/*
 功能：传入id商品编号，取出相对应的商品数量
 * */
function upNum(id){
	var arr=getCookieJsonarr();//获取cookie数据为数组对象
	for(var i=0;i<arr.length;i++){
		if(id==arr[i].id){
			return arr[i].count;
		}
	}
}
