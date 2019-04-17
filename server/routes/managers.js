const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/myMall')
const goods = require('./goods')
 
const db = mongoose.connection

const model = mongoose.Schema({
  name: String,
  pwd: String
}, {versionKey: false})
const Models = mongoose.model('managers', model)

/* 管理员登录 */
router.post('/login', (req, res, next) => {
  var selector = {name : req.body.name}
  var obj = {coed: 0}
  Models.find(selector, (err, data) => {
    if (err) {
      obj = {code: 1, error: err}
    } else {
      if (data[0] && data[0].pwd === req.body.pwd) {
          obj = {code: 0}
      } else {
        obj = {code: 1, error: '登录失败'}
      }
    }
    res.send(obj)
    res.end()
  })
})

router.post('/search', (req, res, next) => {
  var selector = {name: ''}
  selector.name = new RegExp(req.body.searchText)
  var obj = {code: 0}
  goods.model.find(selector, (err, data) => {
    if (err) {
      obj = {code: 1, error: err}
    } else {
      if (data[0]) {
        obj.data = data
      } else {
        obj = {code: 1, error: '搜不到商品，请正确输入关键字'}
      }
    }
    res.send(obj)
    res.end()
  })
})

module.exports = router
