const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
// app.use(express.logger())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//  mongodb
const db = require('./config/mongoose')()
db.on('error', console.error.bind(console, '连接错误:'))
db.once('open', function () {
  // 一次打开记录
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
  console.log('app is listen on: http://127.0.0.1:3001')
})

module.exports = app
