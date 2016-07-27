'use strict'
const reptile = require('../public/scripts/reptile')
const Model = require('../controllers/model.js')

exports.query = function (req, res, next) {
  const type = req.query && req.query.type
  const model = new Model('cnode')
  model.queryCount(function (count) {
    count = count || 0
    res.send({count: count})
  })
}

exports.removeAll = function (req, res, next) {
  const type = req.body && req.body.type
  const model = new Model('cnode')
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
  const maxCount = req.body && req.body.maxCount
  reptile.fetchArticle('cnode')
}
