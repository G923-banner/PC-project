/* 轮播图 */
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    autoplay:5000,
    loop:true
});
var nav=document.querySelector('.boutique_navBar');
var leftFloor=document.querySelector('.boutique_floor_nav');
var floorLi=document.querySelectorAll("#floor li");
var floor=document.querySelectorAll('.boutique_floor_bar');
/* 固定顶部 */
window.onscroll = function() {
    //为了保证兼容性，这里取两个值，哪个有值取哪一个
    //scrollTop就是触发滚轮事件时滚轮的高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
    if( scrollTop>=96 ){
        //闪购首页导航固定
        nav.style.position='fixed';
        nav.style.left='0px';
        nav.style.right='0px';
        nav.style.top='0px';	
    }else{
        nav.style.position='relative';
    }
    /* 左侧导航什么时候显示 */
    if( scrollTop>=300 ){
        leftFloor.style.display='block';
    }else{
        leftFloor.style.display='none';
    }

    /* 楼层偏移量 */
    floor.forEach(function(item,index){
        // console.log(item.offsetTop);
        /* 遍历所有楼层，获取当前滚动到哪个楼层，index表示当前楼层的下标索引 */
        // if( item.offsetTop - scrollTop < 300 && item.offsetTop> scrollTop ){ 
        if( item.offsetTop - scrollTop < 300 && item.offsetTop> scrollTop-100 ){ 
            /* 所有楼层不选中 */
            for(let f=0;f<floorLi.length;f++){
                floorLi[f].className='';
            }    
            //当前楼层被选中      
            floorLi[index].className='boutique_floor_on';        
        }
    })    
}
/* 楼层点击事件 */
floorLi.forEach((item,index) => {
    // console.log(item);
    item.onclick=function(){
        console.log(index)
        var floorTop=floor[index].offsetTop;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
        var timer = setInterval(function () {
            //  判断运动方向    页面向下运动                    
            if(scrollTop < floorTop){
                scrollTop += 50;
                //  判断清楚计时器
                if(scrollTop >= floorTop){
                    clearInterval(timer)
                    scrollTop = floorTop;
                }
                document.body.scrollTop = document.documentElement.scrollTop = scrollTop;
            }else if(scrollTop > floorTop){
                //  页面向上运动
                scrollTop -= 50;
                if(scrollTop <= floorTop){
                    clearInterval(timer)
                    scrollTop = floorTop;
                }
                document.body.scrollTop = document.documentElement.scrollTop = scrollTop;
            }
        }, 16.7)

    }
})
/* 返回顶部 */
var back=document.querySelector('.boutique_floor_back');
back.onclick=function(){
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;   
    // console.log(scrollTop)
    var timer = setInterval(function(){
        if( scrollTop==0 ){            
            clearInterval(timer);
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }else{
            scrollTop -= 50;
            document.body.scrollTop = document.documentElement.scrollTop = scrollTop;
        }
    },16.7)
    
}

/* 上新 */
var new_list=document.querySelector('.boutique_new');
axios.get('http://localhost:3000/zhou/boutiqueNew').then( res => {
    //console.log(res.data);
    var str='';
    for(let i=0;i<res.data.length; i++){
        str += `
        <div class="boutique_list">
            <a href="boutique_con.html?brand=${res.data[i].brand_id}&&type_id=${res.data[i].type_id}" class="boutique_list_con">
                <div class="boutique_list_imgBar">
                    <img class="boutique_list_img" src="${res.data[i].brand_img}">
                    `
                    if( res.data[i].sale_img ){
                        str +=`<img class="boutique_list_dis" src="${res.data[i].sale_img}">`
                    }                    
                    str += `<div class="boutique_list_des">${res.data[i].describe}</div>
                </div>
                <div class="boutique_list_text clearfix">
                    <div class="boutique_list_textLeft">
                        <img class="boutique_list_logo" src="${res.data[i].logo}">
                        <p>${res.data[i].title}</p>
                    </div>
                    <div class="boutique_list_textRight"><span>${res.data[i].price}</span>元/起</div>
                </div>
                <i class="top"></i>
                <i class="left"></i>
                <i class="right"></i>
                <i class="bottom"></i>
            </a>
        </div>	
        `
    }
    new_list.innerHTML=str;    
}).catch( err => {
    console.log(err);
})
/* 八佰伴列表 */
var list_babai=document.querySelector('.boutique_babai');
var list_beauty=document.querySelector('.boutique_beauty');
var list_child=document.querySelector('.boutique_child');
var list_cloth=document.querySelector('.boutique_cloth');
var list_bags=document.querySelector('.boutique_bags');
var list_code=document.querySelector('.boutique_code');
var list_home=document.querySelector('.boutique_home');
getList(1,list_babai);
getList(2,list_beauty);
getList(3,list_child);
getList(4,list_cloth);
getList(5,list_bags);
getList(6,list_code);
getList(7,list_home);
/* 美妆配饰列表 */
function getList(type,dom){
    axios.get('http://localhost:3000/zhou/boutique/typeLists?type_id='+type).then( res => {
        // console.log( res.data );
        var str='';    
        res.data.forEach(item => {
            str += `
            <div class="boutique_list">
                <a href="boutique_con.html?brand=${item.brand_id}&&type_id=${item.type_id}" class="boutique_list_con">
                    <div class="boutique_list_imgBar">
                        <img class="boutique_list_img" src="${item.brand_img}">
                        `
                        if( item.sale_img ){
                            str +=`<img class="boutique_list_dis" src="${item.sale_img}">`
                        }                    
                        str += `<div class="boutique_list_des">${item.describe}</div>
                    </div>
                    <div class="boutique_list_text clearfix">
                        <div class="boutique_list_textLeft">
                            <img class="boutique_list_logo" src="${item.logo}">
                            <p>${item.title}</p>
                        </div>
                        <div class="boutique_list_textRight"><span>${item.price}</span>元/起</div>
                    </div>
                    <i class="top"></i>
                    <i class="left"></i>
                    <i class="right"></i>
                    <i class="bottom"></i>
                </a>
            </div>	
            `
        })
        dom.innerHTML = str;    
    }).catch( err => {
        console.log(err);
    })
}
