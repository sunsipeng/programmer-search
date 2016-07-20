/**
 * node-segment词性表
 * https://github.com/leizongmin/node-segment/blob/master/lib/POSTAG.js
 */

'use strict'
const modelParticiple = require('../models/participle')

class Participle extends modelParticiple {

  getParticiple (str) {
    var simpleKey = []
    const keyWords = this.participle.doSegment(str, {
      simple: true
    })
    var removeKeys = [0x00000800, 0x10000000, 0x00020000, 0x00002000, 0x00000200]
    keyWords.forEach((item) => {
      if (!this.hasParams(simpleKey, item['w']) && !this.hasParams(removeKeys, item['p'])) {
        simpleKey.push(item['w'])
      }
    })
    return simpleKey
  }

  hasParams (array, params) {
    var hasParams = false
    array.forEach((items) => {
      if (items === params) {
        // console.log(items)
        hasParams = true
      }
    })
    return hasParams
  }
}

module.exports = Participle
