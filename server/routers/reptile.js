'use strict'

const reptile = require('../public/scripts/reptile')
exports.fecthInfo = function (req, res, next) {
  reptile.fetchArticle(function (result) {
    let len = result.length + ''
    // res.send(len)
  })
}
