var express = require('express')
var sqlite3 = require('sqlite3').verbose()

var app = express()
app.set('view engine', 'pug')

var db = new sqlite3.Database('library.db')

function searchArtist (artist, cb) {
  let q = `SELECT * FROM albums WHERE artist LIKE '%${artist}%';`
  db.all(q,  cb)
}

function getAlbums(cb) {
  db.all(`SELECT * FROM albums;`, cb)
}

app.get('/', function (req, res) {
  getAlbums((err, as) => res.json(as))
})

// TODO 
app.get('/search', function (req, res) {
  let q = req.query
  if (q.artist) {
    searchArtist(q.artist, (err, as) => {
      res.json(as)
    })
  }
  else
    res.json([])
})

function run (port, cb) {
  let server = app.listen(port, function (err) {
    if (err) throw err
    cb(server)
  })
}

module.exports = run
