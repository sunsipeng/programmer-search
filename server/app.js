// var path = require('path')
var express = require('express')
var api = require('./api/index.js')
var bodyParser = require('body-parser')

var app = express()
// app.use(express.logger())
// app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'accept, content-type'
  })
  next()
})

app.post('/topics', function (req, res, next) {
  var params = req.body
  console.log(params)
  api.querySegment(params).then(function (data) {
    var results = []
    for (var i = 0; i < 10; i++) {
      results.push(data.get('results')[i])
    }
    res.json(results)
  })
})

app.listen('3001', function () {
  console.log('app is listen on: http://localhost:3001')
})

module.exports = app
