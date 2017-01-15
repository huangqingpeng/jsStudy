/*
 * 创建类Banner()
 * 参数为：
 * id    应该是板块的id
   path  轮播图片的 路径
   url   ajax请求数据的路径
*/
function Banner(id, path, url) {
	this.id = document.getElementById(id); //轮播模块
	this.rBtn = this.id.querySelector(".control-right"); //模块右侧按钮
	this.lBtn = this.id.querySelector(".control-left"); //左侧按钮
	this.uL = this.id.querySelector(".content"); //轮播项
	this.oL = this.id.querySelector(".list"); //轮播tab  页签
	this.index = 0; //轮播项索引
	this.timer; //定时器id
	this.uList; //所有轮播图片集合
	this.oList; // 页签集合
	this.btns = this.id.querySelector(".btns"); //按钮
	this.path = path;
	this.url = url;
	this.init(); //执行方法
}
/*********************把公有方法添加到Banner原型中__proto__********************/
Banner.prototype = {
/*************************ajax 请求数据 获取数据******************************/
	init: function(url) {
		var that = this;
		var obj = {
			method: "get",
			url: this.url,
			isAnsyc: "true",
			success: function(data) {
				var arrData = JSON.parse(data);//数组  数组里面为对象
				//console.log(arrData);
				that.bindDom(arrData);
				that.bindEvent();
			},
			error: function(data) {
				alert(data);
			}
		}
		ajax(obj); //调用函数ajax  获取数据
	},
/***********************************绑定DOM 操作***************************/
	bindDom: function(arr) {
		for(var i = 0; i < arr.length; i++) {
			var uLi = document.createElement("li");
			var oLi = document.createElement("li");
			if(i == 0) {
				uLi.className = "active";
				oLi.className = "active";
			}
			uLi.innerHTML = '<a href="' + this.path + arr[i].targetSrc + '">' +
				'<img src="' + this.path + arr[i].imgSrc + '"/>' + '</a>';
			this.uL.appendChild(uLi);
			this.oL.appendChild(oLi);
		}
		this.uList = this.id.querySelectorAll(".content li");
		this.oList = this.id.querySelectorAll(".list li");
	},
/********************************* 绑定轮播事件*******************************/
	bindEvent: function() {
		var that = this;
		this.id.onmouseover = function() {
			that.btns.className = " btns active";
			clearInterval(that.timer);
			//alert(1);
		};
		this.id.onmouseout = function() {
			that.btns.className = " btns";
			autoPlay();
		};
/****************************左侧可点击按钮************************************/
		this.rBtn.onclick = function() {
			animate(that.uList[that.index], {
				left: -764
			}, 10); //让第一张图片的left值为-764px      0
			that.oList[that.index].className = "";
			that.index++;
			that.index = that.index % that.uList.length; //让index的值始终在0-3范围内
			that.uList[that.index].style.left = "764px"; //让下一张图片的left值为764px 瞬间     1
			that.uList[that.index].className = "active";
			that.oList[that.index].className = "active";
			animate(that.uList[that.index], {
				left: 0
			}, 10); //让下一张图片的left值为0      目标值
			//getListBackground(index);//页签同步
		}

/****************************右侧可点击按钮************************************/
		this.lBtn.onclick = function() {
				animate(that.uList[that.index], {
					left: 764
				}, 10); //让第一张图片的left值为-764px      0
				that.oList[that.index].className = " "; //清除当前页签类名
				that.index--;
				if(that.index < 0) {
					that.index = that.uList.length - 1;
				}
				that.index = that.index % that.oList.length; //让index的值始终在0-3范围内
				that.uList[that.index].style.left = "-764px"; //让下一张图片的left值为764px 瞬间     1
				that.uList[that.index].className = "active";
				that.oList[that.index].className = "active"; //添加当前页签类名
				animate(that.uList[that.index], {
					left: 0
				}, 10); //让下一张图片的left值为0      目标值
				//getListBackground(index);//页签同步
			}
/************************给页签添加事件**************************************/

		this.oL.onmouseover = function(e) {
			var _e = window.event || e;
			var _t = _e.target || _e.srcElement;
			for(var i = 0; i < that.oList.length; i++) {//遍历给每个页签加上索引，使页签与轮播图片索引同步
				that.oList[i].index = i;
			}
			if(_t.tagName.toLocaleLowerCase() == "li") {
				if(_t.index > that.index) { //向左运动
					animate(that.uList[that.index], {
						left: -764
					}, 10); //当前图片向左运动
					that.oList[that.index].className = ""; //清除当前页签类名
					that.uList[_t.index].style.left = "764px";
					that.uList[_t.index].className = "active";
					that.oList[_t.index].className = "active"; //添加当前页签类名
					animate(that.uList[_t.index], {
						left: 0
					}, 10); //让下一张图片的left值为0      目标值
				} else if(_t.index < that.index) { //向右运动
					animate(that.uList[that.index], {
						left: 764
					}, 10); //当前图片向左运动
					that.oList[that.index].className = ""; //清除当前页签类名
					that.uList[_t.index].style.left = "-764px";
					that.uList[_t.index].className = "active";
					that.oList[_t.index].className = "active"; //添加当前页签类名
					animate(that.uList[_t.index], {
						left: 0
					}, 10); //让下一张图片的left值为0      目标值
				}
				that.index = _t.index; //让index同步
				// getListBackground(index);//页签同步
			}

		}
/****************************定义自动轮播轮播函数******************************/
		function autoPlay() {
			that.timer = setInterval(function() {
				that.rBtn.onclick();
			}, 2000)
		}
/******************************启动自动轮播***********************************/
		autoPlay();

	}

}

var url = "http://127.0.0.1:8020/day18-object/object-lunbo/js/05_2ajaxlunbo.json";
var path = "http://127.0.0.1:8020/day18-object/object-lunbo/img/";
/******************** Banner的实例1***********************/
var lbt1 = new Banner("lbt1", path, url);
/******************** Banner的实例2***********************/
var lbt2 = new Banner("lbt2", path, url);