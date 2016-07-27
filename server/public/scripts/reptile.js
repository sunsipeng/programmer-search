'use strict'
const segmentfault = require('./segmentfault')
const cnode = require('./cnode')

exports.fetchArticle = (type) => {
  if (type === 'segmentfault') {
    segmentfault.fetchArticle()
  } else {
    cnode.fetchArticle()
  }
}
