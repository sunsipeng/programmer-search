'use strict'
const Participle = require('../controllers/participle')
const Leancloud = require('../controllers/Leancloud')
const participle = new Participle()
const leancloud = new Leancloud()

exports.topics = function (req, res, next) {
  var params = req.body
  var keyWords = participle.getParticiple(params.title)
  leancloud.querySegment(keyWords).then((data) => {
    console.log(data)
    res.json(data)
  })
}
