var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  id: Number,
  name: String,
  key: Array,
  type: String,
  sourceImg: String,
  sourceTitle: String,
  sourcePath: String,
  sourceContent: String
})

module.exports = mongoose.model('Aritcle', schema)
