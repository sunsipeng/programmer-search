const util = require('../util/index.js')

const AV = util.getNewAV()
const query = new AV.Query('segmentfault')
const segment = util.getNewSegment()

const getParticiple = (str) => {
  var simpleKey = []
  const keyWords = segment.doSegment(str, {
    simple: true
  })
  keyWords.forEach(function (item) {
    simpleKey.push(item['w'])
  })
  console.log(simpleKey)
  return simpleKey
}

const querySegment = (params) => {
  return query.get('5785a1e479bc440050b5ae69')
}

module.exports = {
  getParticiple,
  querySegment
}
