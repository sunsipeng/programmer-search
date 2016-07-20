var mongoose = require('mongoose')
var config = require('./config')

const mongooseDB = function () {
  mongoose.connect(config.mongodb)
  return mongoose.connection
}

module.exports = mongooseDB
