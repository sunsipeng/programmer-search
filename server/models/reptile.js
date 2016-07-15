'use strict'
var superagent = require('superagent')
var cheerio = require('cheerio')
var Learncloud = require('./learncloud')
var Participle = require('./participle')
var async = require('async')
var url = require('url')
var FETCH_URL = 'https://segmentfault.com/questions'

class Reptile {
  constructor () {
    this.participle = new Participle().participle
    this.segmentRef = new Learncloud().ref
    this.page = 1
    this.results = []
    this.count = 100000
    this.MAX_LENGTH = 10000
    this.currencyCount = 0
  }

  fetchHomeUrl () {
    return new Promise((resolve, reject) => {
      superagent.get(FETCH_URL + '?page=' + this.page)
        .end(function (err, sres) {
          if (err) return console.error(err)
          resolve(this.getTopics(sres))
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
    return topicUrls
  }

  saveDetail (url, callback) {
    var begin = new Date().getTime()
    this.currencyCount++
    superagent.get(url).end((err, sres) => {
      if (err) return console.error(err)
      callback(null, this.getDetail())
      var delay = new Date().getTime() - begin
      console.log('现在的并发数是', (this.currencyCount + '').green, '，正在抓取的是', url.green, '，耗时', (delay + '').green + '毫秒')
      this.currencyCount--
    })
  }

  getKeyWords (title) {
    var keyWords = this.participle.doSegment(title, {
      simple: true,
      stripPunctuation: true,
      convertSynonym: true
    })
    return keyWords
  }

  getDetail (sres) {
    var $ = cheerio.load(sres.text)
    var title = $('#questionTitle').text().replace(/[\s]/g, '').substr(0, 200)
    var content = $('.question').text().replace(/[\s]/g, '').substr(0, 800)
    var key = this.getKeyWords(title)
    var data = {
      key: key,
      sourceLink: url,
      sourceTitle: title,
      sourceContent: content
    }
    return data
  }

  fetchSuccess (err, result) {
    if (err) return console.error(err)
    this.results = this.results.concat(result)
    var len = this.results.length
    if (len < this.MAX_LENGTH) {
      if (this.page % 5 === 0) {
        this.segmentRef.save({
          'results': this.results
        }).then(function () {
          console.log('数据存入成功！')
        })
      }
      this.page++
      this.fetchHomeUrl()
    }
  }

  successLog (startTime) {
    var len = this.results.length + ''
    var delayTime = new Date().getTime() - startTime

    console.log('现在抓取的数据条数第: ', len.red, ' 条，距离 ', (this.MAX_LENGTH + '').red, '  条数据还差:  ', (this.MAX_LENGTH - len + '').red, '条')
    console.log(' 这是抓取第 ', (this.page + '').red, ' 页数据', ' 总共耗时：', (delayTime, '').red)
  }

  fetchArticleDetil () {
    var startTime = new Date().getTime()
    return this.fetchHomeUrl().then((topicUrls) => {
      async.mapLimit(topicUrls, 5, function (url, callback) {
        this.saveDetail(url, callback)
      }, (err, result) => {
        this.successLog(startTime)
        this.fetchSuccess(err, result)
      })
    })
  }
}

module.exports = Reptile
