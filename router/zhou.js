const express = require('express')
const router = express.Router();

//引入mysql数据库
var mysql = require('mysql')
//创建数据库连接，数据库默认端口3306
var connection = mysql.createConnection({
  host: 'localhost', //数据库地址，默认端口3306
  port: '3308', 
  user: 'root',      //数据库登录用户名
  password: 'root',  //数据库登录密码
  database: 'bl'   //数据库名
})
//连接数据库
connection.connect()
/* 精品首页上新 */
router.get('/boutiqueNew', (req, res) => {
   connection.query(`select * from brand_lists where is_new=1`, function(err, rows, fields){
     res.send(rows);
   })
})
/* 精品首页其他类别 */
router.get('/boutique/typeLists', (req, res) => {
  var type_id=req.query.type_id;
  connection.query(`select * from brand_lists where type_id=${type_id} and is_index=1`, function(err, rows, fields){
    res.send(rows);
  })
})
/* 品牌内页 */
router.get('/boutiue/brandCon',(req,res)=>{
  var brand_id=req.query.brand_id;
  // console.log( brand_id ); 
  connection.query(`select * from brand_lists where brand_id=${brand_id}`, function(err,rows,fields){
      res.send(rows);   
  })
})
/* 品牌内页热卖推荐 */
router.get('/boutiue/brandHot',(req,res)=>{
  var type_id=req.query.type_id;
  // console.log( brand_id ); 
  connection.query(`select * from brand_lists where type_id=${type_id} and is_hot=1`, function(err,rows,fields){
      res.send(rows);   
  })
})
/* 品牌内页产品 */
router.get('/boutiue/pro',(req,res)=>{  
  var brand_id=req.query.brand_id;
  var pro_type=req.query.type;
  connection.query(`select * from pro_list where brand_id=${brand_id} and pro_type like '%${pro_type}%'`, function(err,rows,fields){    
    res.send(rows);
  })
})
/* 品牌内页分类 */
router.get('/boutiue/protype',(req,res)=>{  
  var brand_id=req.query.brand_id;
  connection.query(`select DISTINCT pro_class1,pro_class2,pro_class3,pro_class4 from pro_list where brand_id=${brand_id}`, function(err,rows,fields){
    var pro_type=[];
    // console.log(rows)
    for(let i=0;i<rows.length;i++){
        if( rows[i].pro_class1 ){
            if( pro_type.indexOf(rows[i].pro_class1)<0){
              pro_type.push(rows[i].pro_class1);
            }            
        }
        if( rows[i].pro_class2 ){
            if( pro_type.indexOf(rows[i].pro_class2)<0){
                pro_type.push(rows[i].pro_class2);
            }            
        }
        if( rows[i].pro_class3 ){
            if( pro_type.indexOf( rows[i].pro_class3 )<0){
              pro_type.push(rows[i].pro_class3);
            }            
        }
        if( rows[i].pro_class4 ){
            if( pro_type.indexOf( rows[i].pro_class4 )){
              pro_type.push(rows[i].pro_class4);
            } 
        }
    }  
    res.send(pro_type);
  })
})
/* 登录 */
router.get('/login',(req,res) => {
  // res.send('登录');
  var name=req.query.name;
  var psw=req.query.psw
  // console.log(name,psw)
  connection.query(`select * from user where username='${name}' and password='${psw}'`, function(err,rows,fields){
      // console.log(rows)
      if(rows.length>0){
        res.send({
          status:200,
          msg:'成功'
        })
      }else{
        res.send({
          status:0,
          msg:'用户名或者密码错误！'
        })
      }
      // res.send('成功')
  })
})
/* 注册 */
/* 解决post参数请求undefined 用于req.body获取值的  */
const bodyParser = require('body-parser')
router.use(bodyParser.json()) //用于解析application/json
router.use(bodyParser.urlencoded({ extended: true })) //用于解析应用程序/x-www-form-urlencoded
router.post('/register', (req,res) => {  
  const user=req.body.user;
  const psw=req.body.psw;
  const tell=req.body.tell;
  const email=req.body.email;
  connection.query(`select * from user where username='${user}' or mobile='${tell}'`, function(err,rows,fields){
      // console.log(rows.length)
      if(rows.length>0){
        res.send({
          msg:'此用户名或手机号已注册'
        })
      }else{
        connection.query(`insert into user (username, password, mobile, email) values ('${user}', '${psw}', '${tell}', '${email}')`, function(err,rows,fields){
            res.send({
                code:1,
                msg:'成功'
            })  
        })
      }
  })     
})
/* 短信验证码 */
router.get('/message',(req,res) => {
  var code=req.query.code;
  // console.log(code)
  if( code=='123456' ){
    res.send({
      msg:'发送成功',
      code:1
    })
  }else{
    res.send({
      msg:'短信验证码错误',
      code:0
    })
  }
  
})
module.exports = router