'use strict'
const AV = require('leancloud-storage')
const APP_ID = '8sHoCO9zAscPm10UR650oS0U-gzGzoHsz'
const APP_KEY = 'YSRe3xVb3akwOrQRmwApQ7IY'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

class Leancloud {
  constructor () {
    var Segmentfault = AV.Object.extend('Segmentfault')
    this.query = new AV.Query('Segmentfault')
    this.ref = new Segmentfault()
  }
}

module.exports = Leancloud
