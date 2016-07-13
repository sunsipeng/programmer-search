const util = require('../util/index.js')

const AV = util.getNewAV()
const query = new AV.Query('segmentfault')
const segment = util.getNewSegment()

const getParticiple = (str) => {
  const keyWords = segment.doSegment(str, {
    simple: true,
    stripPunctuation: true,
    convertSynonym: true
  })
  return keyWords
}

const querySegment = (params) => {
  console.log(params.page)
  return query.get('5785a1e479bc440050b5ae69')
}

module.exports = {
  getParticiple,
  querySegment
}
