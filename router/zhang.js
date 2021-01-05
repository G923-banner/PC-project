const express = require("express")
const mysql = require("mysql")
const router = express.Router()

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
    res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
    next();
});
// 链接服务器
const conn = mysql.createConnection({
        host: 'localhost',
        port: 3305,
        user: 'root',
        password: 'root',
        database: 'bl'
    })
    // ***************content**************
router.get('/user', (req, res) => {
        let sql = `select * from bailian`
        conn.query(sql, (err, data) => {
            res.send({
                status: 200,
                data
            })
        })
    })
    // ****************b-banner*******************
router.get('/test', (req, res) => {
    let sql = `select * from image`
    conn.query(sql, (err, data) => {
        res.send({
            status: 200,
            data
        })
    })
})
router.get('/roll', (req, res) => {
    let sql = `select * from overflow`
    conn.query(sql, (err, data) => {
        console.log(data)
        res.send({
            status: 200,
            data
        })
    })
})

router.get('/navbar', (req, res) => {
    var number = req._parsedOriginalUrl.query
        // console.log(11111,number);
    let sql = `select * from blwarp limit ${number},7`
    conn.query(sql, (err, data) => {
        // console.log(data);
        res.send({
            status: 200,
            data
        })
        if (err) {
            console.log(err);
        }
    })
})
module.exports = router;