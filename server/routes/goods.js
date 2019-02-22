const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/myMall')

const db = mongoose.connection
const model = mongoose.Schema({
  name: String,
  price: Number,
  sellerName: String,
  class: Number,
  status: Number,
  desc: String,
  selledNum: 0,
  imgSrc: String
}, {versionKey: false})
const Models = mongoose.model('good', model)

/* 上线商品 */
router.post('/postGoods', (req, res, next) => {
  let newData = new Models({ name: req.body.name, price: req.body.price, sellerName: req.body.sellerName, class: req.body.class, status: 0, desc: req.body.desc, selledNum: 0, imgSrc: req.body.imgSrc})
  newData.save((err, data) => {
    var obj = {code: 0}
    if (err) {
      obj.code = 1
      res.send(obj)
    } else {
      res.send(obj)
    }
    res.end()
  })
})

/* 查找我的商品 */
router.post('/myGoods', (req, res, next) => {
  var selector = {sellerName: req.body.sellerName}
  var obj = {code: 0}
  Models.find(selector, (err, data) => {
    if (err) {
      res.send("Error:" + err)
    } else {
      if (data[0]) {
        obj.data = data
        res.send(obj)
      } else {
        obj.data = null
        res.send(obj)
      }
    }
    res.end()
  })
})

/* 修改商品 */
router.post('/updateGood', (req, res, next) => {
  var selector = {_id : req.body._id}
  var set = {
    name: req.body.name,
    price: req.body.price,
    class: req.body.class,
    desc: req.body.desc}
  Models.update(selector, set, (err, data) => {
    var obj = {code: 0}
    if (err) {
      obj.code = 1
      obj.err = err
      res.send(obj)
    } else {
      res.send(obj)
    }
    res.end()
  })
})

/* 修改商品图片 */
router.post('/updateImg', (req, res, next) => {
  var selector = {_id : req.body._id}
  var set = { imgSrc: req.body.imgSrc}
  Models.update(selector, set, (err, data) => {
    var obj = {code: 0}
    if (err) {
      obj.code = 1
      obj.err = err
      res.send(obj)
    } else {
      res.send(obj)
    }
    res.end()
  })
})

/* 修改商品状态 */
router.post('/alterStatus', (req, res, next) => {
  var selector = {_id: req.body._id}
  var set = { status: req.body.status}
  Models.update(selector, set, (err, data) => {
    var obj = {code: 0}
    if (err) {
      obj.code = 1
      obj.err = err
      res.send(obj)
    } else {
      res.send(obj)
    }
    res.end()
  })
})

/* 分页查询 */
router.post('/getData', (req, res, next) => {
  var path = req.body.path
  var obj = {code: 0}
  Models.find((err, data) => {
    if (err) {
      obj.code = 1
      obj.err = err
    } else {
      obj.data = data
    }
    res.send(obj)
    res.end()
  }).skip(path).limit(10)
})

/* 查询总页数 */
router.post('/getPath', (req, res, next) => {
  var obj = {code: 0}
  Models.count((err, data) => {
    if (err) {
      obj.code = 1
      obj.err = err
    } else {
      obj.data = data
    }
    res.send(obj)
    res.end()
  })
})

/* 分类排序查询 */
router.post('/classSortFind', (req, res, next) => {
  var selector = (req.body.class || req.body.class === 0)? {'class': req.body.class}: {}
  var sorted = (req.body.sort|| req.body.sort === 0)? req.body.sort: {}
  var path = req.body.path
  var obj = {code: 0}
  Models.count(selector, (err, data) => {
    if (err) {
      obj.code = 1
      obj.err = err
      res.send(obj)
      res.end()
    } else {
      if (data !== 0) {
        obj.count = data
        Models.find(selector, (err, data2) => {
          if (err) {
            obj.code = 1
            obj.err = err
            res.send(obj)
            res.end()
          } else {
            obj.data = data2
            res.send(obj)
            res.end()
          }
        }).sort(sorted).skip(path).limit(10)
      }
    }
  })
})

module.exports = router