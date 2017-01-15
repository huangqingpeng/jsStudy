/*
 	设计类
 	组织方式不一样
 	参数：
 		id：轮播图模块的id
 		path:代表服务器资源的路径
 */

function LunBo(id, p, url) {
	//this
	this.lbt = document.getElementById(id); //代表轮播图模块
	this.content = this.lbt.querySelector(".content"); //代表一组轮播项的容器模块
	this.list = this.lbt.querySelector(".list"); ///代表一组tab按钮的容器模块
	this.path = p; //代表服务器资源的路径
	this.btns = this.lbt.querySelector(".btns"); //左右按钮模块
	this.control_right = this.btns.querySelector(".control-right"); //右按钮
	this.control_left = this.btns.querySelector(".control-left"); //左按钮
	this.lbt_items; //一组轮播项
	this.tabs; //一组tab切换按钮
	this.index = 0; //控制轮播的编号
	this.termId; //定时器标识
	this.url = url;
	this.init();
}

LunBo.prototype = {
	/*初始化轮播图功能*/
	init: function() {
		var that = this;
		/*拿数据*/
		/*启动数据请求*/
		ajax({
			method: "get",
			url: this.url,
			isAsyc: true,
			success: function(data) {
				console.log(data);
				var arr = JSON.parse(data);
				that.bindDom(arr);
				that.bindEvent();
			},
			error: function(mes) {
				alert(mes);
			}
		})
	},
	/*
	 	根据数据动态生成节点对象追加到文档中
	 */
	bindDom: function(a) {
		for (var i = 0, len = a.length; i < len; i++) {
			var li = document.createElement("li"); //创建的轮播项
			var tab = document.createElement("li"); //创建的控制按钮
			tab.num = i; //为每一个tab按钮添加一个键值对，表示当前是第几个按钮
			if (i == 0) {
				li.className = "active";
				tab.className = "active";
			}
			var obj = a[i]; //imgSrc   targetSrc
			li.innerHTML = '<a href="' + obj.targetSrc + '">' +
				'<img src="' + path + obj.imgSrc + '"/>' +
				'</a>';

			this.content.appendChild(li);
			this.list.appendChild(tab);
		}

		this.lbt_items = this.lbt.querySelectorAll(".content li"); //一组轮播项
		this.tabs = this.lbt.querySelectorAll(".list li"); //一组轮播项
	},

	/*
	 	绑定功能
	 */
	bindEvent: function() {
		var that = this;
		/*
		鼠标浮动上，显示控制按钮
		* */
		this.lbt.onmouseenter = function() {
			//this
			that.btns.className = "btns active";
			clearInterval(that.termId);
		}

		/*
			鼠标离开，隐藏控制按钮
		* */
		this.lbt.onmouseleave = function() {
			that.btns.className = "btns";
			autoPlay();
		}

		/*右侧按钮实现轮播*/
		this.control_right.onclick = function() {
			//index        //0
			animate(that.lbt_items[that.index], {
				left: -764
			}, 10)
			that.tabs[that.index].className = "";
			that.index++; //1
			that.index = that.index % that.lbt_items.length; //确定了编号
			that.lbt_items[that.index].style.left = "764px";
			that.lbt_items[that.index].className = "active";

			animate(that.lbt_items[that.index], {
				left: 0
			}, 10)
			that.tabs[that.index].className = "active";
		}

		/*左侧按钮实现轮播*/
		this.control_left.onclick = function() {
			//index      //3
			animate(that.lbt_items[that.index], {
				left: 764
			}, 10)
			that.tabs[that.index].className = "";
			that.index--; //2
			if (that.index < 0) {
				that.index = that.lbt_items.length - 1;
			}
			that.lbt_items[that.index].style.left = "-764px";
			that.lbt_items[that.index].className = "active";
			animate(that.lbt_items[that.index], {
				left: 0
			}, 10)
			that.tabs[that.index].className = "active";
		}

		/*----------------------------------*/
		/*
 		功能：通过点击tab按钮实现切换
 		第一：事件委托绑定事件
 		第二步：为每一个按钮添加索引
 	*/
		this.list.onclick = function(e) {
			var _e = window.event || e;
			var _t = _e.target || _e.srcElement;

			if (_t.tagName.toLowerCase() == "li") {

				//index //当前的显示的轮播项
				//_t.num   //下一个轮播项

				if (that.index > _t.num) { //一起向右
					animate(that.lbt_items[that.index], {
						left: 764
					}, 10)
					that.tabs[that.index].className = "";
					//
					that.lbt_items[_t.num].style.left = "-764px";
					that.lbt_items[_t.num].className = "active";
					animate(that.lbt_items[_t.num], {
						left: 0
					}, 10)
					that.tabs[_t.num].className = "active";
				} else if (that.index < _t.num) { //一起向左
					animate(that.lbt_items[that.index], {
						left: -764
					}, 10)
					that.tabs[that.index].className = "";
					//
					that.lbt_items[_t.num].style.left = "764px";
					that.lbt_items[_t.num].className = "active";

					animate(that.lbt_items[_t.num], {
						left: 0
					}, 10)
					that.tabs[_t.num].className = "active";
				}
				that.index = _t.num;

			}
		}

		/*
	 	自动轮播
	 */
		function autoPlay() {
			that.termId = setInterval(function() {
				that.control_right.onclick();
			}, 2000)
		}

		autoPlay(); //启动自动播放
	}
}
var path = "http://127.0.0.1:8020/1222code/images/";
var lbt1 = new LunBo("lbt1", path, "http://127.0.0.1:8020/1222code/data.json");
var lbt2 = new LunBo("lbt2", path, "http://127.0.0.1:8020/1222code/data.json");
var lbt3 = new LunBo("lbt3", path, "http://127.0.0.1:8020/1222code/data.json");