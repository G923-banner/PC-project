var brand_id=window.location.href.split('=')[1].split('&&')[0];
var type_id=window.location.href.split('=')[2];
// console.log(brand_id)
var classR=document.querySelector('.bouCon_class_right');	
var classM=document.querySelector('.bouCon_class_middle')		
classR.onclick=function(){
    var hasCla=event.target.className.indexOf('bouCon_class_rightOpen')
    if( hasCla>0 ){
        event.target.classList.remove('bouCon_class_rightOpen');
        event.target.innerText='展开';	
        classM.style.height='34px'			
    }else{
        event.target.innerText='收起';
        event.target.classList.add('bouCon_class_rightOpen');
        classM.style.height='auto'	
    }

}
/* 倒计时固定 */
var bouCon_count=document.querySelector('.bouCon_count_bar')
window.onscroll = function() {
    //为了保证兼容性，这里取两个值，哪个有值取哪一个
    //scrollTop就是触发滚轮事件时滚轮的高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if( scrollTop>=96 ){	
        //闪购详情页倒计时固定        
        bouCon_count.style.position='fixed';
        bouCon_count.style.left='0px';
        bouCon_count.style.right='0px';
        bouCon_count.style.top='0px';
    }else{
        bouCon_count.style.position='relative';
    }
}

var logo=document.querySelector('.bouCon_count_logo');
var describe=document.getElementById('describe');
var price=document.getElementById('price');
var middleClass=document.querySelector('bouCon_class_middle');
var banner=document.getElementById('bannerImg');
var text_type=document.getElementById('text_type');
var text_name=document.getElementById('text_name');
var text_des=document.getElementById('text_des');
/* 获取banner */
axios.get('http://localhost:3000/zhou/boutiue/brandCon',{
    params:{
        brand_id
    }
}).then(res=>{
    // console.log(res.data[0]);
    const data=res.data[0];
    logo.src=data.logo;
    describe.innerText=data.describe
    price.innerText=data.price;
    banner.src=data.banner_img;
    text_type.innerText=data.type_name;
    text_name.innerText=data.title;
    text_des.innerText=data.describe;
}).catch(err=>{
    console.log(err);
})
/* 热门推荐 */
var hot_bar=document.querySelector('.bouCon_hot_conBar');
axios.get('http://localhost:3000/zhou/boutiue/brandHot',{
    params:{
        type_id
    }
}).then(res=>{
    console.log(res.data);
    var str='';
    res.data.forEach(function(item){
        str+=`
        <div class="bouCon_hot_con_list">
            <div class="bouCon_hot_con_listCon">
                <img src="${item.brand_img}">
                <div class="bouCon_hot_con_listText">${item.title}</div>
            </div>
        </div>
        `
    })
    hot_bar.innerHTML=str
}).catch(err=>{
    console.log(err);
})
/*获取分类*/
var bouCon_class_middle=document.querySelector('.bouCon_class_middle');
var span=bouCon_class_middle.childNodes;
axios.get('http://localhost:3000/zhou/boutiue/protype?brand_id='+brand_id).then(res=>{
    // console.log(res.data);
    var str=`<span onclick="getType('所有商品')">所有商品</span>`;
    res.data.forEach(function(item){
        str+=`<span onclick="getType('${item}')">${item}</span>`
    })
    bouCon_class_middle.innerHTML=str;
}).catch(err=>{
    console.log(err);
})
/*获取产品列表*/
var type=[
    {
        id:1,
        text:'美容护理'
    },
    {
        id:2,
        text:'面部护肤'
    },
    {
        id:3,
        text:'身体护理'
    },
    {
        id:4,
        text:'缤纷彩妆'
    },
    {
        id:5,
        text:'魅力香氛'
    },
    {
        id:6,
        text:'沐浴用品/个人清洁'
    },
    {
        id:7,
        text:'精油芳疗'
    },
    {
        id:8,
        text:'化妆水'
    },
    {
        id:9,
        text:'洁面'
    },
    {
        id:10,
        text:'防晒'
    },
    {
        id:11,
        text:'面部精华'
    },
    {
        id:12,
        text:'眼部护理'
    },
    {
        id:13,
        text:'面膜'
    },
    {
        id:14,
        text:'唇部护理'
    },
    {
        id:15,
        text:'眼部精华'
    },
    {
        id:16,
        text:'眼霜'
    },
    {
        id:17,
        text:'身体乳/霜'
    },
    {
        id:18,
        text:'身体磨砂/去角质'
    },
    {
        id:19,
        text:'底妆'
    },
    {
        id:20,
        text:'粉饼'
    },
    {
        id:21,
        text:'女士香水'
    },
    {
        id:22,
        text:'泡澡浴盐/浴液/花瓣'
    },
    {
        id:23,
        text:'单方精油'
    },
    {
        id:24,
        text:'乳液/面霜'
    }
]
getPro(brand_id,1); //默认调取全部产品
function getType(text){
    // console.log(text);
    // console.log(event.target) 
    for(let s=0;s<span.length;s++){
        span[s].className=''
    }
    event.target.className='bouCon_class_active';    
    if( text=='所有商品' ){
        // console.log(11111)
        getPro(brand_id,1);
    }else{
        for(let i=0;i<type.length;i++){
            if(type[i].text==text){
                // console.log(type[i].id)
                getPro(brand_id,type[i].id);
            }
        }
    }
}
var proCon=document.querySelector('.bouCon_conBar');
function getPro(brand_id=1,type){    
    axios.get('http://localhost:3000/zhou/boutiue/pro',{
        params:{
            brand_id,
            type
        }
    }).then(res=>{
        // console.log(res.data)
        var str=''
        res.data.forEach(function(item){
            str+=`
            <div class="bouCon_conList_bar">
                <div class="bouCon_conList">
                    <div class="bouCon_conList_con">
                        <div class="bouCon_conList_img"><img src="${item.pro_img}"></div>
                        <p class="bouCon_conList_price">￥ ${item.pro_price}</p>
                        <div class="bouCon_conList_text">${item.pro_title}</div>
                    </div>
                </div>
            </div>
            `
        })
        proCon.innerHTML=str;
    }).catch(err=>{
        console.log(err);
    })
}

