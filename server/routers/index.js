'use strict'
module.exports = function (router) {
  const topic = require('./topic')
  const admin = require('./admin')
  const reptile = require('./reptile')

  router.get('/topics', topic.topics)
  router.get('/reptile', reptile.fecthInfo)
  router.get('/admin/query', admin.query)
  router.post('/admin/removeAll', admin.removeAll)
  router.post('/admin/reptile', admin.startReptile)

  return router
}
