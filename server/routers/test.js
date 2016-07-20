'use strict'
var Article = require('../controllers/article.js')
var article = new Article()
exports.getTest = function (req, res, next) {
  article.query({}, function (doc) {
    res.send(doc)
  })
  // article.removeAll()
}
