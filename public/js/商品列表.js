// 显示对应的内容
var showmainlist = document.querySelectorAll('.leftshowmain>ul>li')
var showlist = document.querySelectorAll('.showlists li')
var showlists = document.querySelector('.showlists')
var showlistone = document.querySelectorAll('.showlistone')
showmainlist.forEach((item, index) => {
    item.onmouseenter = function() {
        // 渲染数据
        axios.get(`http://localhost:3000/zhang/navbar?${index * 8}`).then(res => {
                console.log(res);
                var shop = res.data.data
                var html = ''
                for (var j = 0; j < shop.length; j++) {
                    // console.log(666666,j);
                    // console.log(shop[j].titlemain);
                    html += `
                 <li>
                     <div class="showlist">
                         <span><a>${shop[j].titlemain}</a>&nbsp;></span>
                         <div class="fllorlist">
                             <a href="#" class="under">${shop[j].main}</a>
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
})