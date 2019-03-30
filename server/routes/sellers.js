const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/myMall')
 
const db = mongoose.connection
const model = mongoose.Schema({
  name: String,
  pwd: String,
  phone: String
}, {versionKey: false})
const Models = mongoose.model('sellers', model)

/* 用户登录 */
router.post('/login', (req, res, next) => {
  var selector = {name : req.body.name}
  var obj = {code: 0}
  Models.find(selector, (err, data) => {
    if (err) {
      obj = {code: 1, error: err}
    } else {
      if (data[0]) {
        if (data[0].pwd === req.body.pwd) {
          obj = {code: 0, data: data[0]}
        } else {
          obj = {code:1, error: '账号或密码错误'}
        }
      } else {
        let obj = {code:2, error: '该账户没注册，清前去注册'}
      }
    }
    res.send(obj)
    res.end()
  })
})

/* 用户注册 */
router.post('/reg', (req, res, next) => {
  findFirst(req, res, (result) => {
    var obj = {code: 0}
    if (result === 1) {
      let newData = new Models({
        name: req.body.name,
        pwd: req.body.pwd,
        phone: req.body.phone
      })
      newData.save((err, data) => {
        if (err) {
          res.send("Error:" + err)
        } else {
          res.send(obj)
        }
        res.end()
      })
    } else if (result === 0) {
      obj.code = 1
      obj.err = '已存在该用户名'
      res.send(obj)
      res.end()
    }
  })
})

/* 用户信息 */
router.post('/myInfo', (req, res, next) => {
  var id = mongoose.Types.ObjectId(req.body.sellerId)
  var selector = {_id : id}
  var obj = {code: 0}
  Models.find(selector, (err, data) => {
    if (err) {
      obj = {code: 1, error: err}
    } else {
      obj = {code: 0, data: data[0]}
    }
    res.send(obj)
    res.end()
  })
})

/* 查找是否已存在 */
function findFirst (req, res, cb) {
  var selector = {name : req.body.username}
  Models.find(selector, (err, data) => {
    if (err) {
      res.send("Error:" + err)
      res.end()
      cb && cb ('err')
    } else {
      if (data[0]) {
        cb && cb (0)            // 0：已存在
      } else {               
        cb && cb(1)             // 1：还没有
      }
    }
  })
}

module.exports = router
