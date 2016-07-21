'use strict'
var ModelArticle = require('../models/article.js')

class Article {
  save (data) {
    var model = new ModelArticle(data)
    model.save(function (err, model) {
      if (err) return console.error(err)
      console.log('save status:' + err)
    })
  }

  query (data, fn) {
    var condition = data || {}
    ModelArticle.find(condition, function (err, doc) {
      if (err) { return err }
      fn(doc)
    })
  }

  remove (data) {
    var condition = data || {}
    ModelArticle.findOne(condition, function (err, doc) {
      if (err) { return err }
      if (doc) {
        doc.remove()
        console.log('remove success!', condition)
      }
    })
  }

  removeAll () {
    ModelArticle.find({}, function (err, doc) {
      if (err) { return err }
      if (doc) {
        doc.forEach((item) => {
          item.remove()
        })
        console.log('remove all success!')
      }
    })
  }
}

module.exports = Article