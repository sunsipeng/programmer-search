var express = require('express')
var bodyParser = require('body-parser')

var app = express()
// app.use(express.logger())
// app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//  mongodb
var db = require('./config/mongoose')()
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
  // yay!
  console.log('success')
})

app.use(function (req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'accept, content-type'
  })
  next()
})

app.use(require('./routers/index')(express.Router()))

app.listen('3001', function () {
  console.log('app is listen on: http://localhost:3001')
})

module.exports = app
