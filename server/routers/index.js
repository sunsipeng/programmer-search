module.exports = function (router) {
  var topic = require('./topic')
  var test = require('./test')

  router.post('/topics', topic.topics)
  router.get('/test', test.getTest)

  return router
}
