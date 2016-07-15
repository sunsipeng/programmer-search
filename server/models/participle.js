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
}

module.exports = Participle
