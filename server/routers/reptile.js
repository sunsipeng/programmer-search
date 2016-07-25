'use strict'

const reptile = require('../public/scripts/reptile')
exports.fecthInfo = function (req, res, next) {
  let body = req.body
  let type = body && body.type
  let maxCount = body && body.maxCount
  if (+type === 1) {
    reptile.fetchArticle(maxCount)
  }
}
