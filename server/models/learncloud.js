'use strict'
const AV = require('leancloud-storage')

class LearnCloud {
  constructor () {
    this.AV = this.initNewAV()
    this.query = new this.AV.Query('segmentfault')
  }

  initNewAV () {
    const APP_ID = '8sHoCO9zAscPm10UR650oS0U-gzGzoHsz'
    const APP_KEY = 'YSRe3xVb3akwOrQRmwApQ7IY'
    AV.init({
      appId: APP_ID,
      appKey: APP_KEY
    })
    return AV
  }

  querySegment (params) {
    return this.query.get('5785a1e479bc440050b5ae69')
  }
}

module.exports = LearnCloud
