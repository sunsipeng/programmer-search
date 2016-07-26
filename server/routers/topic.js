'use strict'
const participle = require('../public/scripts/participle')
const Article = require('../controllers/article.js')
const article = new Article()

const utils = {
  include: function (arr, key) {
    let includeStatus = false
    arr.forEach(function (item) {
      if (item === key) {
        includeStatus = true
      }
    })
    return includeStatus
  },
  getTopics: function (doc, keyWords) {
    const results = []
    doc.forEach((data) => {
      const keyArr = data.key
      keyWords.forEach((key) => {
        if (utils.include(keyArr, key)) {
          results.push(data)
        }
      })
    })
    return results
  },
  getRegular: function (keyWords) {
    let re = ''
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
  const query = req.query
  const title = query.title
  const page = query.page
  const limit = query.limit
  const start = (page - 1) * limit
  const end = page * limit
  const keyWords = participle.getKeys(title)
  const re = utils.getRegular(keyWords)
  console.log({'sourceTitle': new RegExp(re)})
  article.query({'sourceTitle': new RegExp(re)}, function (doc) {
    if (!doc) {
      res.status('404')
      res.send({message: 'Data not found'})
    }
    res.json({
      resultsLength: doc.length,
      results: doc.slice(start, end),
      keyWords: keyWords
    })
  })
}
