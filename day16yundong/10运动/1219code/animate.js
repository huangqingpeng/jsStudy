/*
	dom，代表运动的那个物体（页面上的节点对象）
	o  代表要更改的样式属性值的集合    对象
	如：
		{
			width:400         // 属性名：值
		}
	
*/
function animate(dom, o) {
	clearInterval(dom.termId);
	dom.termId = setInterval(function() {
		var flag = true; // 可以
		/*
			定时器停止的条件
				所有的样式属性都达到目标后，再停止定时器
		 */
		//for(var key in 集合)   集合就代表一个数组或对象      key就代表数组的索引后对象的键名
		for (var key in o) {
			//o[key]    //目标值
			//getStyleValue(dom,key);  //当前值
			var currentValue = parseInt(getStyleValue(dom, key)); //当前值
			var step = (o[key] - currentValue) / 100; //步子  越来越小
			//对步子做限制   速度极限的值         1  或   -1
			//0.111        -0.111
			//Math     ceil       floor
			if(currentValue!=o[key]){
				flag = false;
			}
			if (step > 0) {
				step = Math.ceil(step);
			} else {
				step = Math.floor(step);
			}
			dom.style[key] = currentValue + step + "px";
		}
		
		if(flag){  //如果全部达到，则停止定时器
			clearInterval(dom.termId);
		}
		
	}, 10)
}

/*
	获取任意【节点对象】的任意的样式【属性】的值 
	dom  节点对象
	pName  样式属性名  "aaa"    
*/
function getStyleValue(dom, pName) {
	if (window.getComputedStyle) { //标准模式
		return window.getComputedStyle(dom, null)[pName];
	} else { //IE低版本
		//dom.currentStyle     样式对象
		return dom.currentStyle[pName];
	}
}