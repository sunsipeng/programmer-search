'use strict'
var Participle = require('../models/participle')
var Learncloud = require('../models/learncloud')

class Util {
  constructor () {
    this.participle = new Participle()
    this.learncloud = new Learncloud()
    this.query = new this.learncloud.AV.Query('segmentfault')
  }

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

  querySegment (params) {
    console.log(params)
    return this.query.get('5785a1e479bc440050b5ae69')
  }
}

module.exports = Util
