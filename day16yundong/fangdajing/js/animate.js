/**
 * Created by Administrator on 2016/12/19.
 */


/*
*   参数：   dom   节点对象
*            object ={
*                  height:300,
*                  left:500
*
*            }   对象里面是 dom的样式   不要带单位
*            time    为速度
*            fn    回调函数  ，运动完成后执行   参数可有可无
* */


function  animate(dom,object,time,fn) {
    clearInterval(dom.timer);
    dom.timer=setInterval(function(){
        var flag=false;
        for(var key in object){
            var currentValue;//获取当前值
            if(key=="opacity"){//判断   如果是透明度
                currentValue=parseInt(getStyleValue(dom,key)*100);//获取当前值
                if(currentValue>object[key]){//主要是  电脑处理数据是二进制   有浮点  需要取整
                    currentValue=parseInt(getStyleValue(dom,key)*100);//获取当前值
                   // alert(1);
                }else{
                    currentValue=Math.ceil(getStyleValue(dom,key)*100);//获取当前值
                }
            }else{//样式不是透明度
                currentValue=parseInt(getStyleValue(dom,key));//获取当前值
            }
            //目标值
            console.log(object[key]);
            var step=(object[key]-currentValue)/10;//步子越来越小
            if(step>0){//如果 为正 则向上取整
                step=Math.ceil(step);
            }
            if(step<0){//如果为负值   则向下取整
                step=Math.floor(step);
            }
            if(object[key]!=currentValue){
                flag=true;
            }
            console.log(currentValue+step);
            if(key=="opacity"){//透明度
                dom.style[key]=(currentValue+step)/100;//标准 浏览器透明度
                dom.style[key]="alpha(opacity="+(currentValue+step)+")";//IE   透明度
            }else{
                dom.style[key]=currentValue+step+"px";
            }

        }

        if(!flag){//如果全部到达目标值   停止定时器
            clearInterval(dom.timer);
            if(fn){//运动完成后，fn如果存在，则调用函数
                fn();
            }
        }
    },time)

    /*
    * 获取非行内样式的属性值
    *   参数： dom  节点对象
     *         key   非行内样式属性名
    * */

    function getStyleValue(dom,key){
        if(getComputedStyle){//标准模式
            return  getComputedStyle(dom,null)[key];
        }else{//IE8
            return  dom.currentStyle[key];
        }

    }


}