'use strict'
const Participle = require('../controllers/participle')
const Learncloud = require('../controllers/learncloud')
const participle = new Participle()
const learncloud = new Learncloud()

exports.topics = function (req, res, next) {
  var params = req.body
  var keyWords = participle.getParticiple(params.title)
  learncloud.querySegment(keyWords).then((data) => {
    res.json(data)
  })
}
