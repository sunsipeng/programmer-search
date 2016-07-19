'use strict'
module.exports = function (router) {
  var topic = require('./topic')
  var test = require('./test')
  var reptile = require('./reptile')

  router.post('/topics', topic.topics)
  router.get('/test', test.getTest)
  router.get('/reptile', reptile.fecthInfo)

  return router
}
