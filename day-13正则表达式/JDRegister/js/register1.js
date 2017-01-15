/**
 * Created by Administrator on 2016/12/14.
 *表单验证：
 用户名
 获取焦点 onfocus
 当用户名为空时，显示默认的提示信息

 失去焦点onblur
 当用户名为空时，隐藏默认的提示信息

 输入时   oninput(有兼容性问题)   onkeyup
 当用户名为空时，更改当前的用户名模块为错误状态
 提示信息：请输入用户名

 当用户名不为空时
 若格式错误，更改当前的用户名模块为错误状态
 提示信息：格式错误，仅支持汉字、字母、数字、“-”“_”的组合，4-20个字符

 若长度不符合，更改当前的用户名模块为错误状态
 提示信息：长度只能在4-20个字符之间

 若通过，更改更改当前的用户名模块为正确状态
 没有提示信息（隐藏）

 *
 */
/************************************************用户名验证***********************************************************/
var userName=document.getElementById("userName");
//获取焦点时
userName.onfocus=checkUserName;
//失去焦点时
userName.onblur=checkUserName;
//输入时  触发事件
userName.onkeyup=checkUserName;

function checkUserName(e){
         var _e=window.event||e;
         var oBox=userName.parentNode;
         var oTip=oBox.nextElementSibling;
         var oSpan=oTip.lastElementChild;
         console.log(oSpan);
         var v=userName.value;
         if(_e.type=="focus"){//获取焦点时
              if(v.length==0){//表框内为空
                  oBox.className="box";
                  oTip.className="tip default";
                  oSpan.innerHTML="仅支持汉字、字母、数字、“-”“_”的组合，4-20个字符";
              }
         }
         else if(_e.type=="blur"){//失去焦点时
             if(v.length==0){//表框内为空
                 oBox.className="box";
                 oTip.className="tip hide";
                 //console.log(oTip);
             }
         }
         if(_e.type=="keyup"){//输入时  触发事件
             if(v.length==0){//表框内为空
                 oBox.className="box error";
                 oTip.className="tip error";
                 oSpan.innerHTML="仅支持汉字、字母、数字、“-”“_”的组合，4-20个字符";
             }else{//表单不为空时
                  //先正则判断是否符合       汉字、字母、数字、“-”“_”的组合，4-20个字符
                  var reg=/^[\u4e00-\u9fa5\w-]+$/;
                  var result=reg.test(v) ;//返回Boolean值
                  console.log(result);
                  if(result){//符合正则匹配的规则  显示正确信息
                      if(v.length>=4&&v.length<=20){
                          oBox.className="box right";
                          oTip.className="tip hide";
                          return true;//输入正确 ，返回true
                      }else{//长度不符合
                          oBox.className="box error";
                          oTip.className="tip error";
                          oSpan.innerHTML="请输入4-20个字符";
                      }

                  }else{//不符合正则匹配的规则  显示错误信息
                      oBox.className="box error";
                      oTip.className="tip error";
                      oSpan.innerHTML="格式错误，仅支持汉字、字母、数字、“-”“_”的组合，4-20个字符";
                  }
             }

         }
}
/************************************************密码验证**************************************************************/
var userPassWord=document.getElementById("pwd");
var PassWord;
//获取焦点时
userPassWord.onfocus=checkUserPassWord;
//失去焦点时
userPassWord.onblur=checkUserPassWord;
//输入时  触发事件
userPassWord.onkeyup=checkUserPassWord;

function checkUserPassWord(e){
    var _e=window.event||e;
    var oBox=userPassWord.parentNode;
    var oTip=oBox.nextElementSibling;
    var oSpan=oTip.lastElementChild;
    //console.log(oSpan);
    PassWord=userPassWord.value;//记录密码，一下面再次输入时验证
    if(_e.type=="focus"){//获取焦点时
        if(PassWord.length==0){//表框内为空
            oBox.className="box";
            oTip.className="tip default";
            oSpan.innerHTML="建议使用字母、数字及符号两种以上的组合，6-20个字符";
        }
    }
     if(_e.type=="blur"){//失去焦点时
        if(PassWord.length==0){//表框内为空
            oBox.className="box";
            oTip.className="tip hide";
            //console.log(oTip);
        }
    }
    if(_e.type=="keyup"){//输入时  触发事件
        if(PassWord.length==0){//表框内为空
            oBox.className="box error";
            oTip.className="tip error";
            oSpan.innerHTML="请输入密码";
        }
        if(PassWord.length<6||PassWord.length>20){//密码长度不符合6-20个字符
          // alert(1);
            oBox.className="box error";
            oTip.className="tip error";
            oSpan.innerHTML="请输入6-20个字符";
        }else{//密码长度符合6-20个字符
            oBox.className="box right";
            var leaval=getLeval(PassWord);//调用函数   判断密码的等级
            console.log(PassWord);
            switch(leaval){
                case 1://密码弱
                    oTip.className="tip ruo";
                    oSpan.innerHTML="有被盗风险,建议使用字母、数字和符号两种及以上组合";
                    break;
                case 2://密码中
                    oTip.className="tip zhong";
                    oSpan.innerHTML="安全强度适中，可以使用三种以上的组合来提高安全强度";
                    break;
                case 3://密码强
                    oTip.className="tip qiang";
                    oSpan.innerHTML="你的密码很安全";
                    break;
                //default:   ;
            }
            return true;//输入正确 ，返回true
        }

    }
    /*
    * 功能：检验密码的等级
    *         密码等级判定：
    *                    1.   单一字符   如：aaa  adfkj   23412423   +_+?????    代表弱
    *                    2.   两种字符   如：dsjh23   2332?=    代表中等
    *                    3.   三种字符   如：jhj34>?     代表强
    * leaval的值：
    *      1  等级低
    *      2  等级中
    *      3  等级高
    * */
    function getLeval(str){
        var leaval=0;
        var regNumber=/\d/;//检验数字
        var regWord=/[a-zA-Z]/;//检验字母
        var regOther=/[^a-zA-Z0-9]/;//检验既不是数字，也不是字母；
        console.log(regNumber);
        console.log(regWord);
        console.log(regOther);
        if(regNumber.test(str)){
            leaval++;
        }
        if(regWord.test(str)){
            leaval++;
        }
        if(regOther.test(str)){
            leaval++;
        }
        return leaval;//代表等级

    }
}


/******************************************确认密码验证**************************************************/
var confrimPassWord=document.getElementById("pwd2");
//获取焦点时
confrimPassWord.onfocus=checkPassWord;
//失去焦点时
confrimPassWord.onblur=checkPassWord;

confrimPassWord.onkeyup=checkPassWord;

function checkPassWord(e){
    var _e=window.event||e;
    var oBox=confrimPassWord.parentNode;
    var oTip=oBox.nextElementSibling;
    var oSpan=oTip.lastElementChild;
    //console.log(oSpan);
    var v=confrimPassWord.value;
    if(_e.type=="focus"){//获取焦点时
        if(v.length==0){//表框内为空
            oBox.className="box";
            oTip.className="tip default";
            oSpan.innerHTML="请再次输入密码";
        }
    }
    if(_e.type=="blur"){//失去焦点时
        if(v.length==0){//表框内为空
            oBox.className="box";
            oTip.className="tip hide";
            //console.log(oTip);
        }else if(PassWord==v){
            oBox.className="box right";
            oTip.className="tip hide";
            console.log(PassWord);
            console.log(v);
            return true;
        }else{
            oBox.className="box error";
            oTip.className="tip error";
            oSpan.innerHTML="两次密码输入不一致";

        }
    }
    if(_e.type=="keyup"){
        if(v.length==0){//表框内为空
            oBox.className="box";
            oTip.className="tip default";
            oSpan.innerHTML="请再次输入密码";
            //console.log(oTip);
        }
    }
}

/************************************************邮箱验证***********************************************************/
var email=document.getElementById("email");
//获取焦点时
email.onfocus=checkUserEmail;
//失去焦点时
email.onblur=checkUserEmail;
//输入时  触发事件
email.onkeyup=checkUserEmail;

function checkUserEmail(e){
    var _e=window.event||e;
    var oBox=email.parentNode;
    var oTip=oBox.nextElementSibling;
    var oSpan=oTip.lastElementChild;
    console.log(oSpan);
    var str=email.value;
    if(_e.type=="focus"){//获取焦点时
        if(str.length==0){//表框内为空
            oBox.className="box";
            oTip.className="tip default";
            oSpan.innerHTML="完成验证后，你可以用该邮箱登录和找回密码";
        }
    }
    if(_e.type=="blur"){//失去焦点时
        if(str.length==0){//表框内为空
            oBox.className="box";
            oTip.className="tip hide";
            //console.log(oTip);
        }else{
            var reg=/^[\w]{6,20}@[\w]{2,6}\.(com|cn)$/;
            var result=reg.test(str);
            if(result){
                oBox.className="box right";
                oTip.className="tip hide";
                return true;
            }else{
                oBox.className="box error";
                oTip.className="tip error";
                oSpan.innerHTML="格式错误";
            }
        }
    }
    if(_e.type=="keyup"){
        if(str.length==0){//表框内为空
            oBox.className="box";
            oTip.className="tip default";
            oSpan.innerHTML="完成验证后，你可以用该邮箱登录和找回密码";
            //console.log(oTip);
        }
    }
}

/************************************************手机验证***********************************************************/
var mobileNumber=document.getElementById("mobile");
//获取焦点时
mobileNumber.onfocus=checkUserMobileNumber;
//失去焦点时
mobileNumber.onblur=checkUserMobileNumber;
//输入时  触发事件
mobileNumber.onkeyup=checkUserMobileNumber;

function checkUserMobileNumber(e){
    var _e=window.event||e;
    var oBox=mobileNumber.parentNode;
    var oTip=oBox.nextElementSibling;
    var oSpan=oTip.lastElementChild;
    console.log(oSpan);
    var str=mobileNumber.value;
    if(_e.type=="focus"){//获取焦点时
        if(str.length==0){//表框内为空
            oBox.className="box";
            oTip.className="tip default";
            oSpan.innerHTML="完成验证后，你可以用该手机登录和找回密码";
        }
    }
    if(_e.type=="blur"){//失去焦点时
        if(str.length==0){//表框内为空
            oBox.className="box";
            oTip.className="tip hide";
            //console.log(oTip);
        }else{
            var reg=/^1[\d]{10}/;
            var result=reg.test(str);
            if(result){
                oBox.className="box right";
                oTip.className="tip hide";
                return true;
            }else{
                oBox.className="box error";
                oTip.className="tip error";
                oSpan.innerHTML="格式错误";
            }
        }
    }
    if(_e.type=="keyup"){
        if(str.length==0){//表框内为空
            oBox.className="box";
            oTip.className="tip default";
            oSpan.innerHTML="完成验证后，你可以用该手机登录和找回密码";
            //console.log(oTip);
        }
    }
}

/******************************************验证码验证**************************************************/
var code=document.getElementById("code");
var updateCode=document.getElementById("updateCode");
//获取焦点时
code.onfocus=checkCode;
//失去焦点时
code.onblur=checkCode;
code.onkeyup=checkCode;
function checkCode(e){
    var _e=window.event||e;
    var oBox=code.parentNode;
    var oTip=oBox.nextElementSibling;
    var oSpan=oTip.lastElementChild;
    //console.log(oSpan);
    var v=code.value;
    var str=updateCode.innerHTML;
    console.log(v+" "+str);
    if(_e.type=="focus"){//获取焦点时
        if(v.length==0){//表框内为空
            oBox.className="box";
            oTip.className="tip default";
            oSpan.innerHTML="看不清？点击图片更换验证码";
        }
    }
    if(_e.type=="blur"){//失去焦点时
        if(v.length==0){//表框内为空
            oBox.className="box";
            oTip.className="tip hide";
            //console.log(oTip);
        }else if(str==v){
            oBox.className="box right";
            oTip.className="tip hide";
            //oSpan.innerHTML="验证码正确";
            //oSpan.style.color="green";
            console.log(str);
            console.log(v);
            return true;
        }else{
            oBox.className="box error";
            oTip.className="tip error";
            oSpan.innerHTML="验证码错误";

        }
    }
}

/**********************************************注册验证***************************************************/

var ck=document.getElementById("ck");
var oBtn=document.getElementById("btn");
oBtn.onclick=function(){
    var flag=ck.checked;
    var sucess=checkCode()&&checkUserMobileNumber()&&checkUserEmail()&&checkPassWord()&&checkUserPassWord()&& checkUserName();
    if(sucess){
        if(!flag){
            alert("请同意京东注册协议");
        }else {
            alert("注册成功");
        }
    }else{
        alert("注册失败");
    }
}

































