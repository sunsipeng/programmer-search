'use strict'
const modelLeancloud = require('../models/Leancloud')

class Leancloud extends modelLeancloud {

  querySegment (keyWords) {
    console.log('query123123213')
    return this.query.get('578dede81532bc0061f8bcd6').then((data) => {
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

module.exports = Leancloud
