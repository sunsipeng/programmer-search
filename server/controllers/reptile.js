'use strict'
const modelReptile = require('../models/reptile')

class Reptile extends modelReptile {
  fetchArticle (callback) {
    this.fetchArticleDetil(callback)
  }
}

module.exports = Reptile
