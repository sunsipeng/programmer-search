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
    this.segmentRef = new Learncloud().AV.Object.extend('segmentfault')
    this.page = 1
    this.results = []
    this.count = 100000
    this.MAX_LENGTH = 10000
    this.currencyCount = 0
  }

  fetchHomeUrl () {
    return new Promise(function (resolve, reject) {
      superagent.get(FETCH_URL + '?page=' + this.page)
        .end(function (err, sres) {
          if (err) {
            return console.error(err)
          }
          var $ = cheerio.load(sres.text)
          var topicUrls = []
          // 获取首页所有的链接
          $('.summary .title').each(function (idx, element) {
            var $link = $(this).find('a')
            var href = url.resolve(FETCH_URL, $link.attr('href'))
            topicUrls.push(href)
          })
          resolve(topicUrls)
        })
    })
  }

  saveDetail (url, callback) {
    var begin = new Date().getTime()
    this.currencyCount++
    superagent.get(url).end(function (err, sres) {
      if (err) {
        return console.error(err)
      }
      var $ = cheerio.load(sres.text)
      var id = this.count
      var title = $('#questionTitle').text().replace(/[\s]/g, '').substr(0, 200)
      var content = $('.question').text().replace(/[\s]/g, '').substr(0, 800)
      var keyWords = this.participle.doSegment(title, {
        simple: true,
        stripPunctuation: true,
        convertSynonym: true
      })
      var data = {
        id: id,
        key: keyWords,
        sourceLink: url,
        sourceTitle: title,
        sourceContent: content
      }
      this.count++
      callback(null, data)
      var delay = new Date().getTime() - begin
      console.log('现在的并发数是', (this.currencyCount + '').green, '，正在抓取的是', url.green, '，耗时', (delay + '').green + '毫秒')
      this.currencyCount--
    })
  }

  fetchArticleDetil () {
    var startTime = new Date().getTime()
    var _this = this
    return this.fetchHomeUrl().then(function (topicUrls) {
      async.mapLimit(topicUrls, 5, function (url, callback) {
        _this.saveDetail(url, callback)
      }, function (err, result) {
        console.log(err)
        _this.results = _this.results.concat(result)
        var len = _this.results.length + ''
        var delayTime = new Date().getTime() - startTime

        console.log('现在抓取的数据条数第: ', len.red, ' 条，距离 ', (_this.MAX_LENGTH + '').red, '  条数据还差:  ', (_this.MAX_LENGTH - len + '').red, '条')
        console.log(' 这是抓取第 ', (_this.page + '').red, ' 页数据', ' 总共耗时：', (delayTime, '').red)
        // 最多存10000数据就停止
        if (len < _this.MAX_LENGTH) {
          if (_this.page % 5 === 0) {
            _this.segmentRef.save({
              'results': _this.results
            }).then(function () {
              console.log('数据存入成功！')
            })
          }
          _this.page++
          this.fetchHomeUrl()
        }
      })
    })
  }
}

module.exports = Reptile
