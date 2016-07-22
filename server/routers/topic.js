'use strict'
var participle = require('../public/scripts/participle')
var Article = require('../controllers/article.js')
var article = new Article()

var utils = {
  include: function (arr, key) {
    var includeStatus = false
    arr.forEach(function (item) {
      if (item === key) {
        includeStatus = true
      }
    })
    return includeStatus
  },
  getTopics: function (doc, keyWords) {
    var results = []
    doc.forEach((data) => {
      var keyArr = data.key
      keyWords.forEach((key) => {
        if (utils.include(keyArr, key)) {
          results.push(data)
        }
      })
    })
    return results
  },
  getRegular: function (keyWords) {
    var re = ''
    keyWords.forEach((item, index) => {
      if (index !== keyWords.length - 1 && index !== 0) {
        re += '(' + item + ')|'
      } else {
        re += '(' + item + ')'
      }
    })
    return re
  }
}

/**
 * 返回匹配title的数据
 */
exports.topics = function (req, res, next) {
  var query = req.query
  var title = query.title
  var page = query.page
  var limit = query.limit
  var start = (page - 1) * limit
  var end = page * limit
  var keyWords = participle.getKeys(title)
  var re = utils.getRegular(keyWords)
  // if (!title) res.json
  console.log({'sourceTitle': new RegExp(re)})
  article.query({'sourceTitle': new RegExp(re)}, function (doc) {
    res.json({
      count: doc.length,
      results: doc.slice(start, end),
      keyWords: keyWords
    })
  })
}
