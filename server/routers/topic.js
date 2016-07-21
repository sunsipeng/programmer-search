'use strict'
var participle = require('../public/scripts/participle')
var Article = require('../controllers/article.js')
var article = new Article()

const include = function (arr, key) {
  var includeStatus = false
  arr.forEach(function (item) {
    if (item === key) {
      includeStatus = true
    }
  })
  return includeStatus
}

exports.topics = function (req, res, next) {
  var params = req.body
  var keyWords = participle.getKeys(params.title)
  var results = []
  article.query({}, function (doc) {
    console.log(doc.length)
    doc.forEach((data) => {
      var keyArr = data.key
      keyWords.forEach((key) => {
        if (include(keyArr, key)) {
          results.push(data)
        }
      })
    })
    res.json({
      results: results,
      keyWords: keyWords
    })
  })
}
