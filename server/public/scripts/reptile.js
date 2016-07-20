'use strict'
var superagent = require('superagent')
var cheerio = require('cheerio')
var async = require('async')
var url = require('url')
var colors = require('colors')
var participle = require('./participle')
var Article = require('../../controllers/article.js')
var article = new Article()

var ctrl = {
  config: {
    url: 'https://segmentfault.com/questions',
    page: 1
  },
  fetchHomeUrl: () => {
    let self = this
    let url = this.config.url
    let page = this.config.page
    return new Promise((resolve, reject) => {
      superagent.get(url + '?page=' + this.page)
        .end(function (err, sres) {
          if (err) return console.error(err)
          resolve(self.getTopics(sres))
        })
    })
  },
  getTopics: (sres) => {
    let url = this.config.url
    let $ = cheerio.load(sres.text)
    let topicUrls = []
    // 获取首页所有的链接
    $('.summary .title').each(function (idx, element) {
      let $path = $(this).find('a')
      let href = url.resolve(url, $path.attr('href'))
      topicUrls.push(href)
    })
    return topicUrls
  },
  saveDetail: (url, callback) => {
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
}
