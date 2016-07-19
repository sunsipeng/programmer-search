'use strict'

const Reptile = require('../controllers/reptile')
const reptile = new Reptile()
exports.fecthInfo = function (req, res, next) {
  reptile.fetchArticle(function (result) {
    res.send(result.length)
  })
}
