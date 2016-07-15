'use strict'
const modelReptile = require('../models/reptile')

class Reptile extends modelReptile {
  fetchArticle () {
    this.fetchArticleDetil()
  }
}

module.exports = Reptile
