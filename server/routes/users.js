const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/myMall')
 
const db = mongoose.connection
db.once('error', () => console.log('Mongo connection error'))
db.once('open', () => console.log('Mongo connection successed'))

const model = mongoose.Schema({
  // _id: Object,
  name: String,
  pwd: String,
  paypwd: String,
  phone: String,
  balance: Number,
  collect: Array
}, {versionKey: false})
const Models = mongoose.model('users', model)

/* 买家登录 */
router.post('/login', (req, res, next) => {
  var selector = {name : req.body.name}
  var obj = {coed: 0}
  Models.find(selector, (err, data) => {
    if (err) {
      obj = {code: 1, error: err}
    } else {
      if (data[0]) {
        if (data[0].pwd === req.body.pwd) {
          obj = {code: 0, userId: data[0]._id}
        } else {
          obj = {code: 1, error: '账号或密码错误'}
        }
      } else {
        obj = {code: 2, error: '该账户没注册，清前去注册'}
      }
    }
    res.send(obj)
    res.end()
  })
})

/* 买家注册 */
router.post('/reg', (req, res, next) => {
  findFirst(req, res, (result) => {
    var obj = {code: 0}
    if (result === 1) {
      let newData = new Models({
        name: req.body.name,
        pwd: req.body.pwd,
        paypwd: req.body.paypwd,
        phone: req.body.phone,
        balance: 0.0,
        collect: []
      })
      newData.save((err, data) => {
        if (err) {
          obj = {code: 1, error: err}
        }
        res.send(obj)
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

/* 个人信息 */
router.post('/myInfo', (req, res, next) => {
  var id = mongoose.Types.ObjectId(req.body.userId)
  var selector = {_id: id}
  var obj = {code: 0}
  Models.find(selector, (err, data) => {
    if (err) {
      obj = {code: 1, error: err}
    } else {
      obj.data = data
    }
    res.send(obj)
    res.end()
  })
})

/* 修改登录密码 */
router.post('/alterPwd', (req, res, next) => {
  var id = mongoose.Types.ObjectId(req.body.userId)
  var selector = {_id: id}
  var obj = {code: 0}
  Models.find(selector, (err, data) => {
    if (err) {
      obj = {code: 1, error: err}
      res.send(obj)
      res.end()
    } else if (req.body.phone !== data[0].phone) {
      obj = {code: 1, error: '手机号不正确'}
      res.send(obj)
      res.end()
    } else {
      var set = {pwd: req.body.pwd}
      Models.update(selector, set, (err, data) => {
        if (err) {
          obj = {code: 1, error: err}
        }
        res.send(obj)
        res.end()
      })
    }
  })
})

/* 修改其他 */
router.post('/alterOthers', (req, res, next) => {
  var id = mongoose.Types.ObjectId(req.body.userId)
  var selector = {_id: id}
  var obj = {code: 0}
  Models.find(selector, (err, data) => {
    if (err) {
      obj = {code: 1, error: err}
      res.send(obj)
      res.end()
    } else if (req.body.pwd !== data[0].pwd) {
      obj = {code: 1, error: '登录密码不正确'}
      res.send(obj)
      res.end()
    } else {
      var set = {name: req.body.newUserName, paypwd: req.body.newPayPwd, phone: req.body.newPhone}
      Models.update(selector, set, (err, data) => {
        if (err) {
          obj = {code: 1, error: err}
        }
        res.send(obj)
        res.end()
      })
    }
  })
})

/* 商品收藏 */
router.post('/addCollect', (req, res, next) => {
  var id = mongoose.Types.ObjectId(req.body.userId)
  var selector = {_id: id}
  var obj = {code: 0}
  Models.find(selector, (err, data) => {
    if (err) {
      obj = {code: 1, error: err}
      res.send(obj)
      res.end()
    } else {
      if (data[0].collect.length >= 10) {
        obj = {code: 1, error: '收藏仓库已满'}
        res.send(obj)
        res.end()
      } else if (data[0].collect.includes(req.body.goodsId)) {
        obj = {code: 1, error: '收藏仓库已存在该商品'}
        res.send(obj)
        res.end()
      } else{
        data[0].collect.push(req.body.goodsId)
        var set = {collect: data[0].collect}
        Models.update(selector, set, (_err, _data) => {
          if (err) {
            obj = {code: 1, error: _err}
          }
          res.send(obj)
          res.end()
        })
      }
    }
  })
})

/* 充值 */
router.post('/recharge', (req, res, next) => {
  var selector = {_id: mongoose.Types.ObjectId(req.body.userId)}
  var obj = {code: 0}
  Models.find(selector, (err, data) => {
    if (err) {
      obj = {code: 1, error: err}
      res.send(obj)
      res.end()
    } else {
      var set = {balance: req.body.sum + data[0].balance}
      Models.update(selector, set, (_err, _data) => {
        if (_err) {
          obj = {code: 1, error: err}
        }
        res.send(obj)
        res.end()
      })
    }
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

module.exports = {
  router: router,
  model: Models
}