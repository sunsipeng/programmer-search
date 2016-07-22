'use strict'
var superagent = require('superagent')
var cheerio = require('cheerio')
var async = require('async')
var nodeUrl = require('url')
var colors = require('colors')
var participle = require('./participle')
var Article = require('../../controllers/article.js')
var article = new Article()

var view = {
  getTopics: function (sres, url) {
    let $ = cheerio.load(sres.text)
    let topicUrls = []
    // 获取首页所有的链接
    $('.summary .title').each(function (idx, element) {
      let $path = $(this).find('a')
      let href = nodeUrl.resolve(url, $path.attr('href'))
      topicUrls.push(href)
    })
    return topicUrls
  },
  getDetail: function (sres, url) {
    var $ = cheerio.load(sres.text)
    var title = $('#questionTitle').text().replace(/[\s]/g, '').substr(0, 200)
    var content = $('.question').text().replace(/[\s]/g, '').substr(0, 800)
    var key = participle.getKeys(title)
    var data = {
      key: key,
      type: 'segmentfault',
      sourcePath: url,
      sourceTitle: title,
      sourceContent: content
    }
    return data
  }
}

var ctrl = {
  config: {
    url: 'https://segmentfault.com/questions',
    page: 1,
    articles: [],
    currencyCount: 0,
    MAX_LENGTH: 20000
  },
  fetchPages: function () {
    let url = this.config.url
    let page = this.config.page
    return new Promise(function (resolve, reject) {
      superagent.get(url + '?page=' + page)
        .end(function (err, sres) {
          if (err) return console.error(err)
          resolve(view.getTopics(sres, url))
        })
    })
  },
  getArticleData: function (url, callback) {
    var begin = new Date().getTime()
    var self = this
    self.config.currencyCount++
    superagent.get(url).end(function (err, sres) {
      if (err) return console.error(err)
      callback(null, view.getDetail(sres, url))

      var delay = new Date().getTime() - begin
      console.log('现在的并发数是', (self.config.currencyCount + '').green, '，正在抓取的是', url.green, '，耗时', (delay + '').green + '毫秒')
      self.config.currencyCount--
    })
  },
  saveArticleData: function (err, result, callback) {
    var articles = this.config.articles
    if (err) return console.error(err)
    this.config.articles = this.config.articles.concat(result)
    if (articles.length < this.config.MAX_LENGTH) {
      result.forEach(function (item, index) {
        article.save(item)
      })
      this.fetchArticle(callback)
    }
    if (typeof callback === 'function') {
      callback(this.config.articles)
    }
    this.successLog()
    this.config.page++
  },
  successLog: function () {
    var len = this.config.articles.length
    console.log('数据存储成功'.red)
    console.log('这是抓取第 ', (this.config.page + '').red, ' 页数据')
    console.log('现在抓取到的数据条数有: ', (len + '').red, ' 条，距离 ', (this.config.MAX_LENGTH + '').red, '  条数据还差:  ', (this.config.MAX_LENGTH - len + '').red, '条')
  },
  asyncMapPages: function (topicUrls, success) {
    var self = this
    async.mapLimit(topicUrls, 5, function (url, callback) {
      self.getArticleData(url, callback)
    }, function (err, result) {
      self.saveArticleData(err, result, success)
    })
  },
  fetchArticle: function (success) {
    this.fetchPages().then(function (topicUrls) {
      ctrl.asyncMapPages(topicUrls, success)
    })
  }
}

module.exports = ctrl
