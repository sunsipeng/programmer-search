'use strict'
var Article = require('../controllers/article.js')
var article = new Article()
exports.getTest = function (req, res, next) {
  article.query({'sourceTitle': /(vue)/}, function (doc) {
    res.send(doc.slice(0, 10))
  })
  // article.removeAll()
}
