var express = require('express')
var sqlite3 = require('sqlite3').verbose()

var app = express()
app.set('view engine', 'pug')

var db = new sqlite3.Database('library.db')

function getAlbums(cb) {
  db.all("SELECT * FROM albums;", function(err, rows) {
  	cb(rows)
  })
}

app.get('/', function (req, res) {
	getAlbums((albums) => {
		res.render('index', { albums: albums })
	})
})

app.get('/albums', function (req, res) {
	getAlbums((rows) => res.json(rows))
})

app.listen(3000, function () {
  console.log('Listening on port 3000.')
})
