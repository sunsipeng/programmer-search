'use strict'
const segmentfault = require('./segmentfault')
const superagent = require('superagent')
const cheerio = require('cheerio')
const async = require('async')
const nodeUrl = require('url')
const colors = require('colors')
const participle = require('./participle')
const Article = require('../../controllers/article.js')
const article = new Article()

const view = {
  getPageUrls: function (sres, url) {
    let $ = cheerio.load(sres.text)
    let topicUrls = []
    // 获取首页所有的链接
    $('.topic_title_wrapper').find('.topic_title').each(function (idx, element) {
      let href = nodeUrl.resolve(url, $(this).attr('href'))
      topicUrls.push(href)
    })
    return topicUrls
  },
  getDetail: function (sres, url) {
    const $ = cheerio.load(sres.text)
    const title = $('.topic_full_title').text().replace(/[\s]/g, '').substr(0, 200)
    const content = $('.topic_content').text().replace(/[\s]/g, '').substr(0, 800)
    const key = participle.getKeys(title)
    const data = {
      key: key,
      type: 'cnode',
      sourcePath: url,
      sourceTitle: title,
      sourceContent: content
    }
    return data
  }
}

const ctrl = {
  config: {
    url: 'https://cnodejs.org/',
    page: 1,
    articles: [],
    currentCount: 0,
    maxCount: 60000
  },
  fetchPages: function () {
    let url = this.config.url
    let page = this.config.page
    return new Promise(function (resolve, reject) {
      superagent.get(url + '?tab=all&page=' + page)
        .end(function (err, sres) {
          if (err) return console.error(err)
          resolve(view.getPageUrls(sres, url))
        })
    })
  },
  getArticleData: function (url, callback) {
    const begin = new Date().getTime()
    const self = this
    self.config.currentCount++
    superagent.get(url).end(function (err, sres) {
      if (err) return console.error(err)
      callback(null, view.getDetail(sres, url))

      const delay = new Date().getTime() - begin
      console.log('当前并发数是', (self.config.currentCount + '').green, '，正在抓取的是', url.green, '，耗时', (delay + '').green + '毫秒')
      self.config.currentCount--
    })
  },
  saveArticleData: function (err, result) {
    var articles = this.config.articles
    if (err) return console.error(err)
    this.config.articles = this.config.articles.concat(result)
    if (articles.length < this.config.maxCount) {
      result.forEach(function (item, index) {
        article.save(item)
      })
      // 一秒后再次请求
      setTimeout(() => {
        this.fetchArticle()
      }, 1000)
    }
    this.successLog()
    this.config.page++
  },
  successLog: function () {
    var len = this.config.articles.length
    console.log('数据存储成功'.red)
    console.log('这是抓取第 ', (this.config.page + '').red, ' 页数据')
    console.log('现在抓取到的数据条数有: ', (len + '').red, ' 条，距离 ', (this.config.maxCount + '').red, '  条数据还差:  ', (this.config.maxCount - len + '').red, '条')
  },
  asyncFetchPages: function (topicUrls) {
    var self = this
    async.mapLimit(topicUrls, 5, function (url, callback) {
      self.getArticleData(url, callback)
    }, function (err, result) {
      self.saveArticleData(err, result)
    })
  },
  fetchArticle: function () {
    this.fetchPages().then(function (topicUrls) {
      console.log(topicUrls)
      ctrl.asyncFetchPages(topicUrls)
    })
  }
}

module.exports = ctrl