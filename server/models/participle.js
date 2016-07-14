'use strict'
const Segment = require('node-segment').Segment

class Participle {
  constructor () {
    this.participle = this.initNewSegment()
  }

  initNewSegment () {
    const segment = new Segment()
    segment.useDefault()
    return segment
  }

  getParticiple (str) {
    var simpleKey = []
    const keyWords = this.segment.doSegment(str, {
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
