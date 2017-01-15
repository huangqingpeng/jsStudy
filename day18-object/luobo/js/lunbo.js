/**
 * Created by Administrator on 2016/12/19.
 */


/*
* ajax获取图片数据,加载完数据之后，执行轮播
* */
var content=document.getElementById("content");
var lunBoItem=document.querySelector(".lunBo-item");
var obj={
        method:"get",
        url:"js/lunbo.json",
        isAnsyc:"true",
        success:function(data){
                 var objData=JSON.parse(data);
                 console.log(objData);//obj
                 var arrData=objData.banner;
                 for(var i=0;i<arrData.length;i++){
                     var oDiv=document.createElement("div");
                     oDiv.className="lunBo-item";
                     oDiv.innerHTML='<a href="#"><img src="'+arrData[i] +'" alt="" /></a>';
                     content.insertBefore(oDiv,lunBoItem);
                 }
                 lunBoItem.innerHTML='<a href="#"><img src="'+arrData[0] +'" alt="" /></a>';
        },
        error:function(data){
              alert(data);
        }
    }
ajax(obj);//调用函数

/*
* 每张图片的width=764px
*
* */

var lunBo=document.getElementById("lunBo");
var lBtn=document.getElementById("lBtn");
var rBtn=document.getElementById("rBtn");
var oList=document.querySelectorAll(".controls li");
var oU=document.querySelector(".controls ul");
var timer;//记录计时器
var index=0;//标记索引
var flag=true;
var w=-1*lunBo.offsetWidth;//每次移动的长度  图片的宽度

autoPlay();
//向左运动
rBtn.onclick=function(){//右边的按钮，点击图片向左运动

    if(flag){
        flag=false;
        index++;
        if(index>4){
            index=1;
            content.style.left=0;//瞬间回到第一张
        }
        animate(content,{left:index*w},10,function(){
              flag=true;
        })

        getLiBackground(index);
    }
}
//向右运动
lBtn.onclick=function(){//左边的按钮，点击时图片向有运动
    if(flag){
        flag=false;
        index--;
        if(index<0){
            index=3;
           content.style.left=4*w+"px";//瞬间回到最后一张图片
        }
        animate(content,{left:index*w},10,function(){
            flag=true;
        })
        getLiBackground(index);
    }
}

//委托写，给每个页签加上一个事件   当鼠标移到当前页签时   图片轮播到和当前页签对应的图片
oU.onmouseover=function(e){
    var _e=window.event||e;
    var _t=_e.srcElement||_.target;
    if(_t.tagName.toLocaleLowerCase()=="li"){
        for(var i=0;i<oList.length;i++){
            oList[i].index=i;
            oList[i].className="";
        }
        _t.className="active";
        index=_t.index;
        //animate(content,{left:index*w},10);
        content.style.left=index*w+"px";
    }
}
//鼠标移入时 停止轮播
lunBo.onmouseenter=function(){
clearInterval(timer);
}
//鼠标移出时  自动轮播
lunBo.onmouseleave=function(){
    autoPlay();
}
//自动轮播   和点击右边按钮时运动一样
function autoPlay(){
    timer=setInterval(function(){
        rBtn.onclick();
    },2000)
}

function getLiBackground(index){//判断页签与图片同步轮播
    for(var i=0;i<oList.length;i++){
        oList[i].className="";
    }
    if(index>=4){//判断当索引大于等于4时   让页签索引为0    因为图片索引最大为4     页签索引最大为3
        oList[0].className="active";
    }else{
        oList[index].className="active";
    }
}

