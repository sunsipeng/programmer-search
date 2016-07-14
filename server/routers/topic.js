const Util = require('../controllers/util')
const util = new Util()
const participle = util.participle
const leancloud = util.leancloud

exports.topics = function (req, res, next) {
  var params = req.body
  var keyWords = participle.getParticiple(params.title)
  leancloud.querySegment(params).then(function (data) {
    var results = data.get('results')
    var matchs = []
    results.forEach(function (item) {
      keyWords.forEach(function (key) {
        if (item.sourceTitle.indexOf(key) !== -1) {
          matchs.push(item)
        }
      })
    })
    res.json(matchs)
  })
}
