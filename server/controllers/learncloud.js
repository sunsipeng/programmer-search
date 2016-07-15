'use strict'
const modelLearncloud = require('../models/learncloud')

class Learncloud extends modelLearncloud {

  querySegment (keyWords) {
    return this.query.get('5785a1e479bc440050b5ae69').then((data) => {
      var results = data.get('results')
      var matchs = this.matchResult(results, keyWords)
      return Promise.resolve(matchs)
    })
  }

  matchResult (results, keyWords) {
    var matchs = []
    results.forEach(function (item) {
      keyWords.forEach(function (key) {
        if (item.sourceTitle.indexOf(key) !== -1) {
          matchs.push(item)
        }
      })
    })
    return matchs
  }
}

module.exports = Learncloud
