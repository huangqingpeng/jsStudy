/**
 * Created by Administrator on 2016/12/20.
 */
var smallBox=document.getElementById("smallBox");
var bigBox=document.getElementById("bigBox");
var uL=document.getElementById("list");
var uList;//tab里所有li
var bigBoxImg;
var smallBoxImg;
var tool=document.getElementById("tool");
var lBtn=document.querySelector(".control-left");
var rBtn=document.querySelector(".control-right");
//var boxLeft=document.querySelector(".box-left");
var oBox=document.querySelector(".fdj");
var path="img/";
var obj={
    method:"get",
    url:"js/fangdajing.json",
    isAnsyc:"true",
    success:function(data){
            var jsonData=JSON.parse(data);
            console.log(jsonData);//为 obj
            bindDom(jsonData);
            bindEvent();
    },
    error:function(data){
        alert(data);
  }
}
ajax(obj);
/*
*   dom  页面加载数据
* */

function bindDom(obj){
    var arr=obj.banner;
    for(var i=0;i<arr.length;i++){
        var uLi=document.createElement("li");//动态创建li
        uLi.setAttribute("smallImg",arr[i].sImgSrc);//给li设置属性 smallImg 为小图的路径
        uLi.setAttribute("bigImg",arr[i].bImgSrc);//同时给li设置属性 bigImg 为放大的图的路径
        if(i==0){
            uLi.className="active";
            var bImg=document.createElement("img");
            bImg.src=path +arr[i].bImgSrc;
            bImg.id="bigImg";
            bigBox.appendChild(bImg);
            var sImg=document.createElement("img");
            sImg.src=path +arr[i].sImgSrc;
            sImg.id="smallImg";
            smallBox.appendChild(sImg);
        }
        uLi.innerHTML='<img src="' + path +arr[i].tabSrc + '"alt=""/>';//li里面为轮播的图
        uL.appendChild(uLi);
    }

    uList=document.querySelectorAll("#list li");//获取所有的tab里的li
    bigBoxImg=document.querySelector("#bigBox img");
    smallBoxImg=document.querySelector("#smallBox img");
}


/*
* 放大镜的事件的绑定
*   定义一个函数，包含所有的事件，
*
* */

var tab=document.querySelector(".control-tabs");
function bindEvent(){
    //tab左右轮播切换操作
   var  w=tab.offsetWidth;
//左侧按钮
    lBtn.onclick=function(){
     var uLeft=uL.offsetLeft+w*-1;//ul的左侧的定位
       // console.log(uL.offsetLeft);
       // console.log(w);
        //console.log(uLeft);
        //console.log(uL);
        if(uLeft<w-uL.offsetWidth){
            uLeft=w-uL.offsetWidth
        }
        animate(uL,{left:uLeft},10);
    }

    //右侧按钮
    rBtn.onclick=function(){
        var uLeft=uL.offsetLeft+w;//ul的左侧的定位
        if(uLeft>0){
            uLeft=0;
        }
        animate(uL,{left:uLeft},10);
    }


//tab图片切换   事件委托

    uL.onmouseover=function(e){
        var _e=window.event||e;
        var _t=_e.srcElement||_e.target;
        if(_t.tagName.toLocaleLowerCase()=="img"){
            var li=_t.parentNode;
            for(var i=0;i<uList.length;i++){
                uList[i].className="";
            }
            li.className="active";
            var bigImgSrc=li.getAttribute("bigImg");
            bigBoxImg.src=path+bigImgSrc;
            var smallImgSrc=li.getAttribute("smallImg");
            smallBoxImg.src=path+smallImgSrc;
        }
    }


//放大镜的放大效果控制事件    事件委托

    smallBox.onmousemove=function(e){
        var _e=window.event||e;
        var sWidth = document.body.scrollLeft || document.documentElement.scrollLeft;
        var sHeight = document.body.scrollTop || document.documentElement.scrollTop;
        var pageX = _e.clientX + sWidth;
        var pageY = _e.clientY + sHeight;
        var x=pageX-tool.offsetWidth/2-oBox.offsetLeft;
        var y=pageY-tool.offsetHeight/2-oBox.offsetTop;
        console.log(x+" "+ y);
        if(x<0){
            x=0;
        }
        if(x>smallBox.offsetWidth-tool.offsetWidth){
            x=smallBox.offsetWidth-tool.offsetWidth;
        }
        if(y<0){
            y=0;
        }
        if(y>smallBox.offsetHeight-tool.offsetHeight){
            y=smallBox.offsetHeight-tool.offsetHeight;
        }
        tool.style.left=x+"px";
        tool.style.top=y+"px";
        //console.log( bigBoxImg);
        bigBoxImg.style.left=-3*x+"px";
        bigBoxImg.style.top=-3*y+"px";
    }

//鼠标移入
    smallBox.onmouseenter=function(){
    tool.className="tool active";
    bigBox.className="box-right active";
}

//鼠标移出
    smallBox.onmouseleave=function(){
        tool.className="tool";
        bigBox.className="box-right";
    }

}