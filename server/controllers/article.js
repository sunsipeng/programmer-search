'use strict'
const ModelArticle = require('../models/article.js')

class Article {
  save (data) {
    const model = new ModelArticle(data)
    model.save(function (err, model) {
      if (err) return console.error(err)
      console.log('save status:' + err)
    })
  }

  query (data, fn) {
    const condition = data || {}
    ModelArticle.find(condition)
      .sort({ date: -1 })
      .exec(function (err, doc) {
        if (err) { return err }
        fn(doc)
      })
  }

  queryCount (fn) {
    ModelArticle.count(function (err, doc) {
      if (err) { return err }
      console.log(doc)
      fn(doc)
    })
  }

  remove (data) {
    const condition = data || {}
    ModelArticle.findOne(condition, function (err, doc) {
      if (err) { return err }
      if (doc) {
        doc.remove()
        console.log('remove success!', condition)
      }
    })
  }

  removeAll (fn) {
    ModelArticle.find({}, function (err, doc) {
      if (err) { return err }
      if (doc) {
        doc.forEach((item) => {
          item.remove()
        })
        fn('remove all success')
        console.log('remove all success!')
      }
    })
  }
}

module.exports = Article
