/* 二维码失效 */
var login_code=document.querySelector('.login_code_tip');
var code_btn=document.querySelector(".login_code_btn ");
setTimeout(function(){
    login_code.style.display="block"
 },5000)
code_btn.onclick=function(){
    login_code.style.display="none"
}

/* tab切换 */
var tab=document.getElementById('tab_tit');
var tabLi=tab.getElementsByTagName('li');
var tabCon=document.querySelectorAll('.login_tabCon');
tab.onclick=function(){ 
    // console.log( event.target.nodeName )
    if( event.target.nodeName=='LI' ){
        for(let i=0;i<tabLi.length;i++){
            // console.log( event.target==event.target )
            tabLi[i]==event.target ? tabLi[i].className='login_tit_active': tabLi[i].className=''
            tabLi[i]==event.target ? tabCon[i].className='login_tabCon': tabCon[i].className='login_tabCon none'
        }
    }
}

/* 登录验证 */
var code_img=document.querySelector('.login_code_img');
// var code_num=Math.floor(Math.random()*3);
// var code=[
//     {
//         url:'https://passport.bl.com/sidebar/verifyCode.html?type=login&v=1608903592677',
//         text:'8kzm'
//     },
//     {
//         url:'https://passport.bl.com/sidebar/verifyCode.html?type=login&v=1608903634830',
//         text:'qrtj'
//     },
//     {
//         url:'https://passport.bl.com/sidebar/verifyCode.html?type=login&v=1608903662168',
//         text:'kdv3'
//     }
// ]
// console.log(code_num);
// code_img.src=code[code_num].url;
var nodeInput=document.querySelectorAll('input');
var nodeMobil= document.getElementById('mobil');
var nodePsw= document.getElementById('psw');
var login_btn= document.getElementById('login_btn');
var error=document.querySelector('.login_error_bar');
var error_text=document.getElementById('err_text');
for(let i=0;i<nodeInput.length;i++){
    nodeInput[i].onfocus=function(){
        nodeInput[i].parentNode.classList.add('login_focus')
    }
    nodeInput[i].onblur=function(){
        // console.log( !input[i].value )
        nodeInput[i].parentNode.classList.remove('login_focus')
        if( !nodeInput[i].value ){            
            nodeInput[i].parentNode.classList.add('login_blur')
        }else{
            nodeInput[i].parentNode.classList.remove('login_blur')
        }
        
    }
} 
var verifyCode = new GVerify("v_container"); /* 获取图形验证码 */
login_btn.onclick=function(){    
    // console.log(mobil,psw)
    const name=nodeMobil.value;
    const psw=nodePsw.value;   
    const imgCode=verifyCode.validate(document.getElementById("img_yzm").value);
    if(!name){
        // console.log('11111')
        error.style.display='block';
        error_text.innerText='请输入用户名';
        return
    }
    if(!psw){
        // console.log('11111')
        error.style.display='block';
        error_text.innerText='请输入密码';
        return
    }
    if(!imgCode){
        // console.log('11111')
        error.style.display='block';
        error_text.innerText='验证码错误';
        return
    }
    axios.get('http://localhost:3000/zhou/login',{
        params:{
            name,
            psw
        }
    }).then( res => {
        // console.log(res.data.status)
        if(res.data.status==200){
            error.style.display='none'
            localStorage.setItem('user',name);
            window.location.href='./index.html';
        }else{
            error.style.display='block';
            error_text.innerText=res.data.msg;
        }
    }).catch( err => {
        console.log(err)
    }) 
       
}