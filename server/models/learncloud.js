'use strict'
const AV = require('leancloud-storage')

class LearnCloud {
  constructor () {
    this.AV = this.initNewAV()
    this.query = new this.AV.Query('Segmentfault')
    this.ref = new this.AV.Object.extend('Segmentfault')
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
}

module.exports = LearnCloud
