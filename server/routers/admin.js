'use strict'
const reptile = require('../public/scripts/reptile')
const Article = require('../controllers/article.js')
const article = new Article()

const queryCount = function () {
  return new Promise((resolve, reject) => {
    article.queryCount(function (count) {
      resolve({len: count})
    })
  })
}

const removeAll = function () {
  return new Promise((resolve, reject) => {
    article.removeAll((ret) => {
      resolve(ret)
    })
  })
}

exports.query = function (req, res, next) {
  let type = req.query && req.query.type
  if (+type === 1) {
    queryCount().then(function (ret) {
      res.send(ret)
    })
  } else {
    res.send({
      message: '错误的参数！'
    })
  }
}

exports.removeAll = function (req, res, next) {
  let type = req.body && req.body.type
  if (+type === 1) {
    removeAll().then(function (ret) {
      res.send(ret)
    })
  } else {
    res.send({
      message: '错误的参数！'
    })
  }
}

exports.startReptile = function (req, res, next) {
  let body = req.body
  let type = body && body.type
  let maxCount = body && body.maxCount
  if (+type === 1) {
    console.log(maxCount)
    reptile.fetchArticle(maxCount)
  } else {
    res.send({
      message: '错误的参数！'
    })
  }
}
