// var code=['https://passport.bl.com/sidebar/verifyCode.html?type=login&v=1608903592677','https://passport.bl.com/sidebar/verifyCode.html?type=login&v=1608903634830','https://passport.bl.com/sidebar/verifyCode.html?type=login&v=1608903662168'];

/* 数字+字母，数字+特殊字符，字母+特殊字符，数字+字母+特殊字符组合，而且不能是纯数字，纯字母，纯特殊字符 */
var reg=/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
var reg_tel = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/; //手机号正则验证
var reg_email=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
var verifyCode = new GVerify("v_container"); /* 获取图形验证码 */
var reg_btn=document.querySelector('.login_input_btn');
var nodeInput=document.querySelectorAll('.reg_input');
var user=document.getElementById('name');
var psw=document.getElementById('psw');
var psw2=document.getElementById('psw2');
var tell=document.getElementById('tell');
var img_code=document.getElementById('img_code');
var tell_message=document.getElementById('tell_message');
var email=document.getElementById('email');

var user_tip=document.getElementById('user_tip');
var psw_tip=document.getElementById('psw_tip');
var psw_tip2=document.getElementById('psw_tip2');
var psw2_tip=document.getElementById('psw2_tip');
var imgCode_tip=document.getElementById('imgCode_tip');
var tell_tip=document.getElementById('tell_tip');
var tellM_tip=document.getElementById('tellM_tip');
var email_tip=document.getElementById('email_tip');

var check=document.querySelector('.reg_checkbox');
var box_bg=document.querySelector('.box_bg');
var close=document.querySelectorAll('.close');
// console.log( check.checked )
/* 获取焦点及失去焦点判断 */
for(let i=0;i<nodeInput.length;i++){
    nodeInput[i].onfocus=function(){
        nodeInput[i].parentNode.classList.add('login_focus')        
        switch(i){
            case 0:{    
                user_tip.style.display='block'            
                user_tip.children[0].src='./image/v-icon-1.png';
                user_tip.children[1].innerText='请输入用户名' 
                break;
            }
            case 1:{     
                psw_tip2.style.display='block';
                psw_tip2.children[0].src='./image/v-icon-1.png';
                psw_tip2.children[1].innerText='请输入登录密码'       
                break;
            }
            case 2:{   
                psw2_tip.style.display='block';
                psw2_tip.children[0].src='./image/v-icon-1.png';
                psw2_tip.children[1].innerText='请输入确认密码'              
                break;
            }
            case 3:{   
                tell_tip.style.display='block';
                tell_tip.children[0].src='./image/v-icon-1.png';
                tell_tip.children[1].innerText='请输入手机号号码'              
                break;
            }
            case 5:{
                tellM_tip.style.display='block';
                tellM_tip.children[0].src='./image/v-icon-1.png'; 
                tellM_tip.children[1].innerText='请输入短信验证码'
                break;
            }
            case 6:{
                // email_tip.style.display='block';
                // email_tip.children[0].src='./image/v-icon-1.png'; 
                // email_tip.children[1].innerText='请输入正确的电子邮箱'; 
                break;
            }
            default: {

            }
        }
    }
    nodeInput[i].onblur=function(){
        // console.log( !nodeInput[i].value )
        // console.log(i);
        nodeInput[i].parentNode.classList.remove('login_focus')
        if( !nodeInput[i].value ){       //输入内容为空      
            nodeInput[i].parentNode.classList.add('login_blur');
            nodeInput[6].parentNode.classList.remove('login_blur')
            // if(i==6){
            //     nodeInput[i].parentNode.classList.add('login_blur')
            // }
            switch(i){
                case 0:{
                    user_tip.style.display='block';
                    user_tip.children[0].src='./image/v-icon-2.png';
                    user_tip.children[1].innerText='请输入用户名' 
                    break;
                }
                case 1:{
                    psw_tip2.style.display='block';
                    psw_tip2.children[0].src='./image/v-icon-2.png';
                    psw_tip2.children[1].innerText='请输入登录密码' 
                    break;
                }
                case 2:{
                    psw2_tip.style.display='block';
                    psw2_tip.children[0].src='./image/v-icon-2.png'; 
                    psw2_tip.children[1].innerText='请输入确认密码' 
                    break;
                }
                case 3:{
                    tell_tip.style.display='block';
                    tell_tip.children[0].src='./image/v-icon-2.png';    
                    tell_tip.children[1].innerText='请输入手机号码' 
                    break;                
                }
                case 5:{
                    tellM_tip.style.display='block';
                    tellM_tip.children[0].src='./image/v-icon-2.png'; 
                    tellM_tip.children[1].innerText='请输入短信验证码'
                    break;
                }
                case 6:{ //邮箱为非必填项
                    // email_tip.style.display='block';
                    // email_tip.children[0].src='./image/v-icon-2.png'; 
                    // email_tip.children[1].innerText='请输入正确的电子邮箱'; 
                    break;
                }
                default:{

                }
            }
            
        }else{
            switch(i){
                case 0:{
                    if( user.value.length<6 || user.value.length>20 ){
                        user_tip.children[0].src='./image/v-icon-2.png';
                        user_tip.children[1].innerText='用户名长度只能在6-20位字符之间'
                    }else if( !reg.test(user.value) ){
                        user_tip.children[0].src='./image/v-icon-2.png';
                        user_tip.children[1].innerText='用户名只能由字母或字母和数字组合' 
                    }else{
                        user_tip.children[0].src='./image/v-icon-3.png';
                        user_tip.children[1].innerText='' 
                    } 
                    break;
                }
                case 1:{
                    if( !reg.test(psw.value) || psw.value.length<8 || psw.value.length>20 ){
                        psw_tip2.children[0].src='./image/v-icon-2.png';
                        psw_tip2.children[1].innerText='登陆密码必须是8-20位字符' 
                    }else{
                        // psw_tip2.style.display='none'
                        psw_tip2.children[0].src='./image/v-icon-3.png';
                        psw_tip2.children[1].innerText='' 
                    } 
                    break;
                }
                case 2:{
                    if( psw2.value != psw.value ){
                        psw2_tip.children[0].src='./image/v-icon-2.png';
                        psw2_tip.children[1].innerText='确认密码与登录密码不一致' 
                    }else{
                        psw2_tip.children[0].src='./image/v-icon-3.png';
                        psw2_tip.children[1].innerText='' 
                    }
                    break;
                }
                case 3:{
                    if( !reg_tel.test(tell.value) ){
                        tell_tip.children[0].src='./image/v-icon-2.png';
                        tell_tip.children[1].innerText='请输入正确手机号' 
                    }else{
                        tell_tip.children[0].src='./image/v-icon-3.png';
                        tell_tip.children[1].innerText=''
                    }
                    break;                
                }
                case 5:{
                    if( tell_message.value.length!=6 ){
                        tellM_tip.children[0].src='./image/v-icon-2.png';
                        tellM_tip.children[1].innerText='短信验证码格式错误' 
                    }else{
                        tellM_tip.children[0].src='./image/v-icon-3.png';
                        tellM_tip.children[1].innerText=''
                    }
                    break;
                }
                case 6:{
                    if( !reg_email.test(email.value) ){
                        console.log(11111)
                        email_tip.style.display='block';
                        email_tip.children[0].src='./image/v-icon-2.png';
                        email_tip.children[1].innerText='请输入正确的电子邮箱' 
                    }else{
                        email_tip.children[0].src='./image/v-icon-3.png';
                        email_tip.children[1].innerText=''
                    }
                    break;
                }
                default:{
                    
                }
            }
        }
        
    }
}
/* 短信验证码验证 */
var yzm_btn=document.querySelector('.reg_yzm');
yzm_btn.onclick=function(){
    if( !tell.value ){    
        tell_tip.style.display='block'    
        tell_tip.children[0].src='./image/v-icon-2.png'; 
        tell_tip.children[1].innerText='请输入手机号号码'
    }else{
        tell_tip.style.display='none'
        settime(60);  
    }    
}
/* 提交 */
reg_btn.onclick=function(){
    const imgCode=verifyCode.validate(document.getElementById("img_code").value);
    if( !nodeInput[0].value ){
        user_tip.style.display='block';
        user_tip.children[0].src='./image/v-icon-2.png';
        user_tip.children[1].innerText='请输入用户名';
        return
    }
    if( !nodeInput[1].value ){
        psw_tip2.style.display='block';
        psw_tip2.children[0].src='./image/v-icon-2.png';
        psw_tip2.children[1].innerText='请输入登录密码' 
        return
    }
    if( !nodeInput[2].value ){
        psw2_tip.style.display='block';
        psw2_tip.children[0].src='./image/v-icon-2.png'; 
        psw2_tip.children[1].innerText='请输入确认密码' 
        return
    }
    if(!imgCode){
        imgCode_tip.style.display='block';
        imgCode_tip.children[0].src='./image/v-icon-2.png'; 
        imgCode_tip.children[1].innerText='验证码错误' 
        return
    }else{
        imgCode_tip.style.display='none';
    }
    if( !nodeInput[3].value ){
        tell_tip.style.display='block';
        tell_tip.children[0].src='./image/v-icon-2.png';    
        tell_tip.children[1].innerText='请输入手机号码' 
        return
    }
    if( !nodeInput[4].value ){
        tellM_tip.style.display='block';
        tellM_tip.children[0].src='./image/v-icon-2.png'; 
        tellM_tip.children[1].innerText='请输入短信验证码'
        return
    }
    if( !check.checked ){
        box_bg.style.display='block';
    }else{
        box_bg.style.display='none'
    }
    axios.get('http://localhost:3000/zhou/message',{
        params:{
            code:nodeInput[5].value
        }
    }).then( res => {
        // console.log(res.data)
        if( res.data.code ==1 ){
            axios.post('http://localhost:3000/zhou/register',{
                user: nodeInput[0].value,
                psw: nodeInput[1].value,
                tell: nodeInput[3].value,
                email: nodeInput[6].value
            }).then(res=>{
                // console.log(res)
                alert(res.data.msg);
                setTimeout(function(){
                    window.location.href='login.html';
                },3000)
            }).catch( err => {
                console.log(err)
            })
        }else{
            // console.log(res.data.msg)
            alert(res.data.msg);
        }
    }).catch( err => {
        console.log(err)
    })
}
/* 关闭弹框 */
// console.log(close)
for(let i=0; i<close.length;i++){
    close[i].onclick=function(){
        box_bg.style.display='none'
    }
}



function settime(num){
    var yzm_input=document.getElementById("jui_form_yzm"); //如果用getElementsByClassName获取类，获取的为数组，下面的yzm_input要改为yzm_input[0]
    var num;
    if( num==0 ){
        yzm_input.innerText="重新发送";
        yzm_input.removeAttribute("disabled");
        yzm_input.setAttribute("class","reg_yzm jui_fc_zhuse")
        return false; //直到倒计时0时停止执行函数
        }else{
            yzm_input.setAttribute("disabled","disabled");
            yzm_input.setAttribute("class","reg_yzm jui_fc_999")
            yzm_input.innerText=num+"s后重发";
            num--;
            }
     //setTimeout(function(){settime(num)},1000);
     setTimeout("settime("+num+")", 1000); //num为变量，所以要用“+”链接
}
