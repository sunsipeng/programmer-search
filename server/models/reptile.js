'use strict'
var superagent = require('superagent')
var cheerio = require('cheerio')
var Participle = require('../controllers/participle')
var async = require('async')
var url = require('url')
var colors = require('colors')
var Article = require('../controllers/article.js')

var article = new Article()
var FETCH_URL = 'https://segmentfault.com/questions'

class Reptile {
  constructor () {
    this.participle = new Participle()
    this.page = 1
    this.results = []
    this.count = 100000
    this.MAX_LENGTH = 10000
    this.currencyCount = 0
  }

  fetchHomeUrl () {
    const self = this
    return new Promise((resolve, reject) => {
      superagent.get(FETCH_URL + '?page=' + this.page)
        .end(function (err, sres) {
          if (err) return console.error(err)
          resolve(self.getTopics(sres))
        })
    })
  }

  getTopics (sres) {
    var $ = cheerio.load(sres.text)
    var topicUrls = []
    // 获取首页所有的链接
    $('.summary .title').each(function (idx, element) {
      var $link = $(this).find('a')
      var href = url.resolve(FETCH_URL, $link.attr('href'))
      topicUrls.push(href)
    })
    // console.log(topicUrls)
    return topicUrls
  }

  saveDetail (url, callback) {
    var begin = new Date().getTime()
    var self = this
    self.currencyCount++
    superagent.get(url).end((err, sres) => {
      if (err) return console.error(err)
      callback(null, this.getDetail(sres, url))

      var delay = new Date().getTime() - begin
      console.log('现在的并发数是', (self.currencyCount + '').green, '，正在抓取的是', url.green, '，耗时', (delay + '').green + '毫秒')
      self.currencyCount--
    })
  }

  getKeyWords (title) {
    var keyWords = this.participle.getParticiple(title)
    return keyWords
  }

  getDetail (sres, url) {
    var $ = cheerio.load(sres.text)
    var title = $('#questionTitle').text().replace(/[\s]/g, '').substr(0, 200)
    var content = $('.question').text().replace(/[\s]/g, '').substr(0, 800)
    var key = this.getKeyWords(title)
    var data = {
      key: key,
      type: 'segmentfault',
      sourcePath: url,
      sourceTitle: title,
      sourceContent: content
    }
    return data
  }

  fetchSuccess (err, result, callback) {
    if (err) return console.error(err)
    var allResults = this.results.concat(result)
    var len = allResults.length
    if (len < this.MAX_LENGTH) {
      result.forEach((item, index) => {
        article.save(item)
      })
      this.page++
      this.fetchArticleDetil()
    }
    if (typeof callback === 'function') {
      callback(allResults)
    }
  }

  successLog (startTime) {
    var len = this.results.length + ''
    var delayTime = new Date().getTime() - startTime

    console.log('现在抓取的数据条数第: ', len.red, ' 条，距离 ', (this.MAX_LENGTH + '').red, '  条数据还差:  ', (this.MAX_LENGTH - len + '').red, '条')
    console.log(' 这是抓取第 ', (this.page + '').red, ' 页数据', ' 总共耗时：', (delayTime, '').red)
  }

  fetchArticleDetil (success) {
    var startTime = new Date().getTime()
    var self = this
    return this.fetchHomeUrl().then((topicUrls) => {
      async.mapLimit(topicUrls, 5, function (url, callback) {
        console.log(url)
        self.saveDetail(url, callback)
      }, (err, result) => {
        self.successLog(startTime)
        self.fetchSuccess(err, result, success)
      })
    })
  }
}

module.exports = Reptile
