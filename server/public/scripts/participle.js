/**
 * node-segment词性表
 * https://github.com/leizongmin/node-segment/blob/master/lib/POSTAG.js
 */
'use strict'
const Segment = require('node-segment').Segment
const segment = new Segment()
segment.useDefault()

const ctrl = {
  getParticiple: (str) => {
    let keyArr = []
    let removeKeys = [0x00000800, 0x10000000, 0x00020000, 0x00002000, 0x00000200]
    const keyWords = segment.doSegment(str)
    keyWords.forEach((item) => {
      if (!this.hasParams(keyArr, item['w']) && !this.hasParams(removeKeys, item['p'])) {
        keyArr.push(item['w'])
      }
    })
    return keyArr
  },
  hasParams: (array, params) => {
    let hasParams = false
    array.forEach((items) => {
      if (items === params) {
        hasParams = true
      }
    })
    return hasParams
  }
}

module.exports = ctrl
