'use strict'
const reptile = require('../public/scripts/reptile')
const Model = require('../controllers/model.js')

exports.query = function (req, res, next) {
  const type = req.query && req.query.type
  const model = new Model(type)
  console.log(type)
  model.queryCount(function (count) {
    count = count || 0
    res.send({count: count})
  })
}

exports.removeAll = function (req, res, next) {
  const type = req.body && req.body.type
  const model = new Model(type)
  console.log(type)
  model.removeAll((message) => {
    if (!message) {
      res.status('404')
      res.send({message: 'removeAllFail'})
    } else {
      res.send({message: message})
    }
  })
}

exports.startReptile = function (req, res, next) {
  const type = req.body && req.body.type
  reptile.fetchArticle(type)
}
