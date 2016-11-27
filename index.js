var express = require('express')
var sqlite3 = require('sqlite3').verbose()

var app = express()
var db = new sqlite3.Database('meta.db')

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Listening on port 3000.')
})
