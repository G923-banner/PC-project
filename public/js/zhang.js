// ****************swiper**************
var mySwiper = new Swiper('.swiper-test', {
        // direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay: true,

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',

        },
        // 如果需要前进后退按钮

    })
    // 鼠标进入暂停播放 鼠标移出继续播放
    // mySwiper.el.onmouseover = function() {
    //     mySwiper.autoplay.stop();
    // }
    // mySwiper.el.onmouseleave = function() {
    //     mySwiper.autoplay.start();
    // }

// ****************swiper**************
var mySwiper = new Swiper('.swiper-content', {
        // direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay: true,

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },
        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    })
    // 鼠标进入暂停播放 鼠标移出继续播放
mySwiper.el.onmouseover = function() {
    mySwiper.autoplay.stop();
}
mySwiper.el.onmouseleave = function() {
    mySwiper.autoplay.start();
}

// ** ** ** ** ** ** ** * tota ** ** ** ** ** ** ** ** ** *
var tota = document.querySelector('.total ul')
axios.get("http://localhost:3000/zhang/test").then(res => {

        var str = ''
        for (var i = 0; i < res.data.data.length; i++) {
            str += `
            <li><img class="hov" src="${res.data.data[i].url_img}" alt=""></li>
            `
            tota.innerHTML = str
        }
    }).catch(err => {
        console.log(err);
    })
    // *******content************
var ul = document.querySelector('.container ul')
axios.get("http://localhost:3000/zhang/user").then(res => {

    var htmlStr = ''
    for (var i = 0; i < res.data.data.length; i++) {
        htmlStr += `
             <li>
                <img src="${res.data.data[i].url_img}" alt="">
                <p class="title">${res.data.data[i].title}</p>
                <div class="price">
                    <p class="z-price"><span>￥</span>${res.data.data[i].price}</p>
                    <p class="x-price">
                        <i class="iconfont icon-like-line"></i><span>收藏</span>
                    </p>
                </div>
            </li>
        `
        ul.innerHTML = htmlStr
    }
}).catch(err => {
    console.log(err);
})

var slide = document.querySelector('.slide ul')
axios.get("http://localhost:3000/zhang/roll").then(res => {

    var html = ''
    for (var i = 0; i < res.data.data.length; i++) {
        html += `
        <li>
            <div class="z-slide"><img src="${res.data.data[i].url_img}" alt=""></div>
            <p class="ben">${res.data.data[i].title}</p>
            <p class="price"><span>￥</span>${res.data.data[i].price}</p>
            <p class="consult"> <span>参考价:</span>${res.data.data[i].content}</p>
        </li>
        `
        slide.innerHTML = html
    }
}).catch(err => {
    console.log(err);
})

// ********滑动js代码**********
var next = document.querySelector('.next')
var slideUl = document.querySelector('.slide>ul')
var front = document.querySelector(".front")
front.style.opacity = "0"
next.onclick = function() {
    slideUl.style.transform = "translate(-966px)"
    next.style.opacity = "0"
    front.style.opacity = "1"
}
front.onclick = function() {
        slideUl.style.transform = "translate(0)"
        next.style.opacity = "1"
        front.style.opacity = "0"

    }
    // 显示对应的内容
var showmainlist = document.querySelectorAll('.leftshowmain>ul>li')
var showlist = document.querySelectorAll('.showlists li')
var showlists = document.querySelector('.showlists')
var showlistone = document.querySelectorAll('.showlistone')
var leftshow = document.querySelector('.leftshow')
showmainlist.forEach((item, index) => {
    item.onmouseenter = function() {
        // 渲染数据
        axios.get(`http://localhost:3000/zhang/navbar?${index * 8}`).then(res => {

                // console.log(res.data.data);
                var shop = res.data.data
                var html = ''
                for (var j = 0; j < shop.length; j++) {
                    // console.log(666666,j);
                    // console.log(shop[j].titlemain);
                    html += `
                                    <li>
                                        <div class="showlist">
                                            <span><a href="javascript:;">${shop[j].titlemain}</a>&nbsp;></span>
                                            <div class="fllorlist">
                                                <a href="javascript:;" class="under">${shop[j].main}</a>
                                            </div>
                                        </div>
                                    </li>
                                `
                }
                // console.log(html);
                // console.log(showlist[index]);
                showlistone[index].innerHTML = html
            }).catch(err => {
                console.log(err);
            })
            //    rigjt样式
        showlists.style.display = "block"


        for (var i = 0; i < showmainlist.length; i++) {
            showlist[i].classList.remove('active')
        }
        showlist[index].classList.toggle('active')
    }
    leftshow.onmouseleave = function() {
        showlists.style.display = "none"
    }
})