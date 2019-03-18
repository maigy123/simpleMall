const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const users = require('./users')
const goods = require('./goods')
mongoose.connect('mongodb://localhost:27017/myMall')

const db = mongoose.connection
const model = mongoose.Schema({
  userId: String,
  goodsId: String,
  number: Number,
  isPay: Number
}, {versionKey: false})
const Models = mongoose.model('cart', model)

/* 加入购物车 */
router.post('/addCart', (req, res, next) => {
  var selector = {userId: req.body.userId, goodsId: req.body.goodsId, isPay: 0}
  var obj = {code: 0}
  Models.find(selector, (err, data) => {
    if (err) {
      obj = {code: 1, error: err}
      res.send(obj)
      res.end()
    } else if (data[0]) {
      obj = {code: 1, error: '购物车中已有该商品'}
      res.send(obj)
      res.end()
    } else {
      let newData = new Models({
        userId: req.body.userId,
        goodsId: req.body.goodsId,
        number: req.body.number,
        isPay: 0
      })
      newData.save((err2, data2) => {
        if (err) {
          obj = {code: 1, error: err2}
        }
        res.send(obj)
        res.end()
      })
    }
  })
})

/* 查询我的购物车数量 */
router.post('/cartNum', (req, res, next) => {
  var selector = {userId: req.body.userId, isPay: 0}
  var obj = {code: 0}
  Models.find(selector, (err, data) => {
    if (err) {
      obj = {code: 1, error: err}
    } else if (data[0]) {
      var result = 0
      for (var item of data) {
        result += item.number
      }
      obj.data = result
    }
    res.send(obj)
    res.end()
  })
})

/* 购物车与余额查询 */
router.post('/cart', (req, res, next) => {
  var selector = {_id: mongoose.Types.ObjectId(req.body.userId)}
  var obj = {code: 0}
  users.model.find(selector, (err, data) => {
    if (err) {
      errDeal(err, res)
    } else {
      obj.balance = data[0].balance
      selector = {userId: req.body.userId, isPay: 0}
      Models.find(selector, (_err, _data) => {
        if (_err) {
          errDeal(_err, res)
        } else if (_data[0]) {
          var cart = []
          for (var i in _data) {
            cart[i] = {id: _data[i].goodsId, number: _data[i].number}
          }
          selector = {$or: []}
          for (var item of cart) {
            selector.$or.push({_id: mongoose.Types.ObjectId(item.id)})
          }
          goods.model.find(selector, (_err2, _data2) => {
            if (_err2) {
              errDeal(_err, res)
            } else {
              obj.data = []
              for (var x in _data2) {
                for (var y in cart) {
                  if (_data2[x]._id == cart[y].id) {
                    obj.data[x] = {id: _data2[x]._id, name: _data2[x].name, number: cart[y].number, imgSrc: _data2[x].imgSrc, price: _data2[x].price}
                  }
                }
              }
              res.send(obj)
              res.end()
            }
          })
        }
      })
    }
  })
})

/* 修改购物车 */
router.post('/alterCart', (req, res, next) => {
  var selector = {}
  if (req.body.type === 0) {      // 删除
    if (req.body.goodsId.length === 1) {
      selector = {userId: req.body.userId, goodsId: req.body.goodsId[0]}
    } else {
      selector = {userId: req.body.userId, goodsId: {$in: []}}
      for (var item of req.body.goodsId) {
        selector.goodsId.$in.push(item)
      }
    }
    deleteCart(selector, res)
  } else {
    selector = {goodsId: req.body.goodsId, userId: req.body.userId}
    var set = {number: req.body.number}
    alterCart(selector, set, res)
  }
})

/* 购买记录 */
router.post('/payRecord', (req, res, next) => {
  var selector = {userId: req.body.userId, isPay: 1}
  Models.find(selector, (err, data) => {
    if (err) {
      errDeal(err, res)
    } else {
      dataOrin = data
      if (dataOrin.length > 1) {
        for (var i = 0; i < dataOrin.length; i++) {
          for (var y = i + 1; y < dataOrin.length; y++) {
            if (dataOrin[i].goodsId === dataOrin[y].goodsId) {
              dataOrin[i].number += dataOrin[y].number
              dataOrin.splice(y, 1)
              y--
            }
          }
        }
      }
      selector = {$or: []}
      for (var item of dataOrin) {
        selector.$or.push({_id: mongoose.Types.ObjectId(item.goodsId)})
      }
      goods.model.find(selector, (_err, _data) => {
        if (_err) {
          errDeal(err, res)
        } else {
          var obj = {code: 0, data: _data}
          for (var i in  obj.data) {
            for (var y in dataOrin) {
              if ( obj.data[i]._id == dataOrin[y].goodsId) {
                obj.data[i].buyNumber = dataOrin[y].number
              }
            }
          }
          res.send(obj)
          res.end()
        }
      })
    }
  })
})

/* 购物车结算 */
router.post('/pay', (req, res, next) => {
  var selector = {userId: req.body.userId, goodsId: {$in: []}}
  for (var item of req.body.goodsId) {
    selector.goodsId.$in.push(item)
  }
  var set = {isPay: 1}
  Models.updateMany(selector, set, (err, data) => {
    if (err) {
      errDeal(err, res)
    } else {
      selector = {_id: mongoose.Types.ObjectId(req.body.userId)}
      set = {balance: req.body.balance}
      users.model.updateMany(selector, set, (_err, data) => {
        if (_err) {
          errDeal(_err, res)
        } else {
          var obj = {code: 0}
          res.send(obj)
          res.end()
          addSellerNum(req.body.goodsId, req.body.number)
        }
      })
    }
  })
})

function addSellerNum (goodsId, number) {
  var selector = {}
  var set = {}
  for (let i = 0; i < goodsId.length; i++) {
    selector = {_id: mongoose.Types.ObjectId(goodsId[i])}
    set = {$inc: {selledNum: number[i]}}
    goods.model.updateOne(selector, set, (err, data) => {
      if (err) {
        console.log(err)
      }
    })
  }
}

function deleteCart (selector, res) {
  Models.remove(selector, (err, data) => {
    if (err) {
      errDeal(err, res)
    } else {
      var obj = {code: 0}
      res.send(obj)
      res.end()
    }
  })
}

function alterCart (selector, set, res) {
  Models.update(selector, set, (err, data) => {
    if (err) {
      errDeal(err, res)
    } else {
      var obj = {code: 0}
      res.send(obj)
      res.end()
    }
  })
}

function errDeal (err, res) {
  var obj = {code: 1, error: err}
  res.send(obj)
  res.end()
}

module.exports = router