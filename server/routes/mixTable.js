const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const goods = require('./goods')
const users = require('./users')

mongoose.connect('mongodb://localhost:27017/myMall')
const db = mongoose.connection

router.post('/myCollect', (req, res, next) => {
  var id = mongoose.Types.ObjectId(req.body.userId)
  var selector = {_id: id}
  var obj = {code: 0}
  users.model.find(selector, (err, data) => {
    if (err) {
      obj = {code: 1, error: err}
      res.send(obj)
      res.end()
    } else if (data[0].collect !== []) {
      selector = {$or: []}
      for (var item of data[0].collect) {
        selector.$or.push({_id: mongoose.Types.ObjectId(item)})
      }
      goods.model.find(selector, (_err, _data) => {
        if (_err) {
          obj = {code: 1, error: _err}
        } else {
          obj.data = _data
        }
        res.send(obj)
        res.end()
      })
    } else {
      obj.data = []
      res.send(obj)
      res.end()
    }
  })
}) 

module.exports = router
