'use strict'
var Participle = require('../models/participle')
var Leancloud = require('../models/learncloud')

class Util {
  constructor () {
    this.participle = new Participle()
    this.leancloud = new Leancloud()
  }
}

module.exports = Util
