const Segment = require('node-segment').Segment
const AV = require('leancloud-storage')

const getNewSegment = () => {
  const segment = new Segment()
  segment.useDefault()
  return segment
}

const getNewAV = () => {
  const APP_ID = '8sHoCO9zAscPm10UR650oS0U-gzGzoHsz'
  const APP_KEY = 'YSRe3xVb3akwOrQRmwApQ7IY'
  AV.init({
    appId: APP_ID,
    appKey: APP_KEY
  })
  return AV
}

module.exports = {
  getNewSegment,
  getNewAV
}
