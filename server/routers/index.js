'use strict'
module.exports = function (router) {
  var topic = require('./topic')
  var admin = require('./admin')
  var reptile = require('./reptile')

  router.get('/topics', topic.topics)
  router.get('/reptile', reptile.fecthInfo)
  router.get('/admin/query', admin.query)
  router.post('/admin/removeAll', admin.removeAll)
  router.post('/admin/reptile', admin.startReptile)

  return router
}
