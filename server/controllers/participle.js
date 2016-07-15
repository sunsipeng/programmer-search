'use strict'
const modelParticiple = require('../models/participle')

class Participle extends modelParticiple {
  getParticiple (str) {
    var simpleKey = []
    const keyWords = this.participle.doSegment(str, {
      simple: true
    })
    keyWords.forEach(function (item) {
      simpleKey.push(item['w'])
    })
    console.log(simpleKey)
    return simpleKey
  }
}

module.exports = Participle
