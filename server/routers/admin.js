'use strict'
const reptile = require('../public/scripts/reptile')
const Article = require('../controllers/article.js')
const article = new Article()

exports.query = function (req, res, next) {
  let type = req.query && req.query.type
  if (+type === 1) {
    article.queryCount(function (count) {
      // if (!count) {
      //   res.send({message: 'count not found'})
      // }
      console.log(count)
      res.send({count: count})
    })
  } else {
    res.send({message: 'error options'})
  }
}

exports.removeAll = function (req, res, next) {
  let type = req.body && req.body.type
  if (+type === 1) {
    article.removeAll((message) => {
      if (!message) {
        res.send({message: 'Data not found'})
      }
      res.send({message: message})
    })
  } else {
    res.send({message: 'error options'})
  }
}

exports.startReptile = function (req, res, next) {
  let body = req.body
  let type = body && body.type
  let maxCount = body && body.maxCount
  if (+type === 1) {
    reptile.fetchArticle(maxCount)
  } else {
    res.send({message: 'error options'})
  }
}
