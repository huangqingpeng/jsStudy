/*
 	思路：
 		第一步：是否显示购物车列表
 			 获取到所要操作的节点对象
 			    若本地有数据，则显示购物车列表，隐藏购物没有数据的提示模块（box）
 			   否则，隐藏购物车列表，显示购物没有数据的提示模块（box）
 		
 		第二步：根据本地数据动态创建表格
 		
 		第三步：计算总价格
 			   获取到tbody里所有的checkbox
 			  循环遍历所有的checkbox，检测是否被选中
 			  若被选中：
 			  	找到当前的tr,再找到小计的单元格里的价格累计
 		
 		第四步：为toby下的每一个check box添加一个onchange事件，用事件委托实现
 		
 		第五步：全选
 				为allCheck绑定一个onchange事件
 		
 		第六步：删除
 			
 			删除dom
 			   找到当前的tr
 			  tbody.removeChild(tr);
 			更新本地cookie(把对应的对象删除)
 			 var pid =  tr.getAttribute("pid");
 			 deleteGoodsById(pid)
 			
 			更新总价格
 		
 		第七 步：数量操作
 			增加  1	
 			减少  -1
 			
 			当前行被选中
 			更改文本框的内容 （数量）
 			更改小计
 			更改总价格
 			
 			本地更新
 */
var table = document.getElementById("table");
var tbody = document.getElementById("tbody");
var box = document.getElementById("box");
var totalPrice = document.getElementById("totalPrice");
var allCheck = document.getElementById("allCheck");

var count = getTotal(); //数字
if (count) { //有数据
	table.className = '';
	box.className = "box hide";
} else { //没有数据
	table.className = 'hide';
	box.className = "box";
}

var arr = getJsonObject(); //获取本地数据，以数组对象的形式返回
//console.log(arr)
for (var i = 0, len = arr.length; i < len; i++) {
	var good = arr[i];
	var tr = document.createElement("tr"); //行
	tr.setAttribute("pid", good.pid); //设置属性
	tr.innerHTML = '<td>' +
		'<input type="checkbox" class="ck"  />' +
		'</td>' +
		'<td>' +
		'<img src="' + good.imgSrc + '" alt="" />' +
		'</td>' +
		'<td>' +
		good.desc +
		'</td>' +
		'<td>' +
		'<button class="down">-</button><input type="text" value="' + good.count + '" readonly="readonly" /><button class="up">+</button>' +
		'</td>' +
		'<td>' +
		'￥<span>' + good.price + '</span>' +
		'</td>' +
		'<td>' +
		'￥<span>' + good.price * good.count + '</span>' +
		'</td>' +
		'<td>' +
		'<button class="del"  >删除</button>' +
		'</td>';

	tbody.appendChild(tr);
}

/*
   	计算总价格
 */
function getTotalPrice() {
	var cks = document.querySelectorAll("tbody .ck"); //数组
	var total = 0; //总价格
	for (var i = 0, len = cks.length; i < len; i++) {
		if (cks[i].checked) { //选中
			var tr = cks[i].parentNode.parentNode;
			var xiaoji = tr.children[5].firstElementChild.innerHTML; //小计
			total = total + Number(xiaoji);
		}
	}
	totalPrice.innerHTML = total; //把计算出来的总价格给显示总价格的标签
}
/*
 	选择tbody下的checkbox时计算总价格，并且检测是否全选
 */
tbody.onchange = function(e) {
	var _e = window.event || e;
	var _t = _e.target || _e.srcElement;
	if (_t.className == "ck") {
		getTotalPrice();
		var cks = document.querySelectorAll("tbody .ck"); //数组
		checkAllCheck();
	}

}
/*
 	检测是否要被全选
 */
function checkAllCheck() {
	var cks = document.querySelectorAll("tbody .ck"); //数组
	var flag = true; //是否有没有全部被选中
	for (var i = 0, len = cks.length; i < len; i++) {
		if (cks[i].checked == false) {
			flag = false;
			break;
		}
	}
	allCheck.checked = flag;
}

/*
 	全选
 */
allCheck.onchange = function() {
	var cks = document.querySelectorAll("tbody .ck"); //数组
	for (var i = 0, len = cks.length; i < len; i++) {
		cks[i].checked = this.checked;
	}
	getTotalPrice()
}

tbody.onclick = function(e) {
	var _e = window.event || e;
	var _t = _e.target || _e.srcElement;

	if (_t.className == "del") { //删除
		var tr = _t.parentNode.parentNode;
		//tr.remove();  //兼容问题，在ie低版本有问题
		tbody.removeChild(tr);

		var pid = tr.getAttribute("pid");
		deleteGoodsById(pid);
		getTotalPrice();
		var count = getTotal(); //数字
		if (count) { //有数据
			table.className = '';
			box.className = "box hide";
		} else { //没有数据
			table.className = 'hide';
			box.className = "box";
		}
	}

	if (_t.className == "down") { //减少数量
		var tr = _t.parentNode.parentNode;
		//当前行被选中
		tr.firstElementChild.firstElementChild.checked = true;
		//更新数量
		var input = _t.nextElementSibling;
		var result = input.value - 1;
		if (result < 1) {
			return; //因为已经小于1了所以往下没有必要再执行
		}
		input.value = result;
		var price = tr.children[4].firstElementChild.innerHTML; //单价

		//更新小计
		var xiaoji = price * result;
		tr.children[5].firstElementChild.innerHTML = xiaoji;

		//更总价格
		getTotalPrice();

		//更新本地数据
		var pid = tr.getAttribute("pid"); //商品的编号
		upadateCountById(pid, -1);
		checkAllCheck();
	}

	if (_t.className == "up") { //增加数量
		var tr = _t.parentNode.parentNode;
		//当前行被选中
		tr.firstElementChild.firstElementChild.checked = true;
		//更新数量
		var input = _t.previousElementSibling;
		var result = parseInt(input.value) + 1;
		if (result > 20) {
			return; //因为已经小于1了所以往下没有必要再执行
		}
		input.value = result;
		var price = tr.children[4].firstElementChild.innerHTML; //单价

		//更新小计
		var xiaoji = price * result;
		tr.children[5].firstElementChild.innerHTML = xiaoji;

		//更总价格
		getTotalPrice();

		//更新本地数据
		var pid = tr.getAttribute("pid"); //商品的编号
		upadateCountById(pid, 1)
		checkAllCheck();
	}

}