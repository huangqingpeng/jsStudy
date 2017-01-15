/*
 	这个文件专门来操作本地数据
 	约定：
 		本地存储购物车里的数据的cookie的名称是  carData
 */

/*
 	查看本地数据中到底有没有对应商品，通过商品编号
 */
function isHasGoodsById(id) {

	var arr = getJsonObject();
	for (var i = 0, len = arr.length; i < len; i++) {
		if (arr[i].pid == id) {
			return true;
		}
	}

	return false;

}

/*
 	计算本地数据所存储的商品的总数量
 */
function getTotal() {
	//‘[{count:1}]’
	var arr = getJsonObject();
	var sum = 0; //总数量
	for (var i = 0, len = arr.length; i < len; i++) {
		sum = sum + arr[i].count;
	}

	return sum;
}

/*
 	获取本地数据，并转化为数组对象返回
 */
function getJsonObject() {
	if (!getCookie("carData")) {
		var date = new Date();
		date.setDate(date.getDate() + 7);
		setCookie({
			name: "carData",
			value: "[]",
			expires: date
		})
	}

	var jsonStr = getCookie("carData"); //肯定能取出本地数据    "[{},{}]"
	var arr = JSON.parse(jsonStr);
	return arr;
}

/*
 	添加对象到本地cookie中
 	参数：o 代表未来接收的实际参数对象
 */
function addGoods(o) {
	var arr = getJsonObject(); //获取本地数据并转化为数组
	arr.push(o); //把对象添加到数组里
	var v = JSON.stringify(arr);
	var date = new Date();
	date.setDate(date.getDate() + 7);
	setCookie({
		name: "carData",
		value: v,
		expires: date
	})

}


/*
 	根据pid编号更新本地对应的商品的数量
 	参数：
 		id  商品的编号
 		num 每次增加的商品的数量
 		1    -1
 */
function  upadateCountById(id,num){
	var arr = getJsonObject();    
	for(var i = 0,len=arr.length;i<len;i++){
		if(arr[i].pid==id){
			arr[i].count = arr[i].count + num;
			break;
		}
	}
	
	var v = JSON.stringify(arr);
	var date = new Date();
	date.setDate(date.getDate() + 7);
	setCookie({
		name: "carData",
		value: v,
		expires: date
	})
	
}


/*
 	根据pid商品编号删除指定的商品
 */
function deleteGoodsById(id){
	var arr = getJsonObject();
	for(var i = 0,len=arr.length;i<len;i++){
		if(arr[i].pid==id){
			arr.splice(i,1);   //删除数组中指定位置的对象
			break;
		}
	}
	var v = JSON.stringify(arr);
	var date = new Date();
	date.setDate(date.getDate() + 7);
	setCookie({
		name: "carData",
		value: v,
		expires: date
	})
	
}











































