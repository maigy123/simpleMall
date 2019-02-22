const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/myMall')
 
const db = mongoose.connection
db.once('error', () => console.log('Mongo connection error'))
db.once('open', () => console.log('Mongo connection successed'))

const model = mongoose.Schema({
  name: String,
  pwd: String
}, {versionKey: false})
const Models = mongoose.model('usertest', model)


router.post('/find', (req, res, next) => {
  
  var selector = {name : req.body.username}
  Models.find(selector, (err, data) => {
    if (err) {
      res.send("Error:" + err)
    } else {
      res.send(data)
    }
    res.end()
  })
  /* Models.find(selector, (err, data) => {
    if (err) {
      res.send("Error:" + err)
    } else {
      res.send(data)
    }
    res.end()
  }).limit(2) */
})

router.post('/add', (req, res, next) => {
  findFirst(req, res, (result) => {
    if (result === 1) {
      let newData = new Models({
        name: req.body.username,
        pwd: req.body.pwd
      })
      newData.save((err, data) => {
        if (err) {
          res.send("Error:" + err)
        } else {
          res.send(data)
        }
        res.end()
      })
    } else if (result === 0) {
      res.send('已存在该用户')
      res.end()
    }
  })
})

router.post('/update', (req, res, next) => {
  var selector = {name : req.body.username}
  var set = {pwd: req.body.pwd}
  Models.update(selector, set, (err, data) => {
    if (err) {
      res.send("Error:" + err)
    } else {
      res.send(data)
    }
    res.end()
  })
})

router.post('/delete', (req, res, next) => {
  var selector = {name : req.body.username}
  Models.remove(selector, (err, data) => {
    if (err) {
      res.send("Error:" + err)
    } else {
      res.send(data)
    }
    res.end()
  })
})

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
 

