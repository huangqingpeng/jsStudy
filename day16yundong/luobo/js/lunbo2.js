/**
 * Created by Administrator on 2016/12/20.
 */
var btns=document.querySelector(".btns");
var lBtn=document.getElementById("control_left");
var rBtn=document.getElementById("control_right");
var container=document.querySelector(".container");
var uList=document.querySelectorAll(".content li");
var oL=document.querySelector(".list");
var oList=document.querySelectorAll(".list li");
var index=0;
var timer;
container.onmouseenter=function(){
    btns.className=" btns active";
    clearInterval(timer);
}
container.onmouseleave=function(){
    btns.className=" btns";
    autoPlay();
}

rBtn.onclick=function(){
    animate(uList[index],{left:-764},10);//让第一张图片的left值为-764px      0
    oList[index].className="";
    index++;
    index=index%uList.length;//让index的值始终在0-3范围内
    uList[index].style.left="764px";//让下一张图片的left值为764px 瞬间     1
    uList[index].className="active";
    oList[index].className="active";
    animate(uList[index],{left:0},10);//让下一张图片的left值为0      目标值
    //getListBackground(index);//页签同步
}
lBtn.onclick=function(){
    animate(uList[index],{left:764},10);//让第一张图片的left值为-764px      0
    oList[index].className=" ";//清除当前页签类名
    index--;
    if(index<0){
        index=uList.length-1;
    }
    index=index%oList.length;//让index的值始终在0-3范围内
    uList[index].style.left="-764px";//让下一张图片的left值为764px 瞬间     1
    uList[index].className="active";
    oList[index].className="active";//添加当前页签类名
    animate(uList[index],{left:0},10);//让下一张图片的left值为0      目标值
    //getListBackground(index);//页签同步
}

for(var i=0;i<oList.length;i++){
    oList[i].index=i;
}

oL.onmouseover=function(e){
    var _e=window.event||e;
    var _t=_e.target||_e.srcElement;
    if(_t.tagName.toLocaleLowerCase()=="li"){
        if(_t.index>index){//向左运动
            animate(uList[index],{left:-764},10);//当前图片向左运动
            oList[index].className="";//清除当前页签类名
            uList[_t.index].style.left="764px";
            uList[_t.index].className="active";
            oList[_t.index].className="active";//添加当前页签类名
            animate(uList[_t.index],{left:0},10);//让下一张图片的left值为0      目标值
        }else if(_t.index<index){//向右运动
            animate(uList[index],{left:764},10);//当前图片向左运动
            oList[index].className="";//清除当前页签类名
            uList[_t.index].style.left="-764px";
            uList[_t.index].className="active";
            oList[_t.index].className="active";//添加当前页签类名
            animate(uList[_t.index],{left:0},10);//让下一张图片的left值为0      目标值
        }
        index=_t.index;//让index同步
       // getListBackground(index);//页签同步
    }

}

//自动轮播
function autoPlay() {
    timer=setInterval(function(){
        rBtn.onclick();
    },2000)
}

//页签变化
function getListBackground(index){
    for(var i=0;i<oList.length;i++){
        oList[i].className="";
    }
    oList[index].className="active";
}