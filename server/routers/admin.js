'use strict'
const reptile = require('../public/scripts/reptile')
const Article = require('../controllers/article.js')
const article = new Article()

exports.query = function (req, res, next) {
  article.queryCount(function (count) {
    count = count || 0
    res.send({count: count})
  })
}

exports.removeAll = function (req, res, next) {
  article.removeAll((message) => {
    if (!message) {
      res.status('404')
      res.send({message: 'removeAllFail'})
    } else {
      res.send({message: message})
    }
  })
}

exports.startReptile = function (req, res, next) {
  let body = req.body
  let maxCount = body && body.maxCount
  reptile.fetchArticle('cnode')
}
