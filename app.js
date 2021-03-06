const express = require('express') //引入express模块
const app = express()
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method' )
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
    res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
    next();
});
    //引入模块
const zhang = require("./router/zhang")
    // const wang = require("./router/wang")
    // const shi = require("./router/shi")
    const zhou = require("./router/zhou")
    // const li = require("./router/li")
    // const guo = require("./router/guo")
    // 处理静态资源
app.use(express.static('public'))
    //张楷
app.use('/zhang', zhang)
    //王广楠
    // app.use('/wang', wang)
    //     //史书成
    // app.use('/shi', shi)
    //     //周姣静
    app.use('/zhou', zhou)
    //     //李梦龙
    // app.use('/li', li)
    //     //郭勇
    // app.use('guo', guo)

app.listen(3000, () => {
    console.log("服务器开启");
})