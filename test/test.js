let app = require('../index.js')
let test = require('tape')
let request = require('request')

let addr = 'http://localhost:9999'
let server=null
test('should be able to start server', t => {
  app(9999, function (s) {
   server=s
   t.ok(s)
   t.end()
  })
})

test('should get list of albums on /feed', t => {
 request.get(`${addr}/feed`, {json:true}, function (err, res, body) {
  t.notOk(err,err,
    'no errors')
  t.ok(body.length,
    'requesting json on "/" returns a list')
  t.ok(body[0].album,
    'first item has an album prop')
  t.ok(body[0].artist,
    'first item has an artist prop')
  t.ok(body[0].ipfsHash,
    'first item has an ipfsHash prop')
  console.log(body[0])
  t.end()
 })
})

test('should find 1 result on /search?artist=Paak', t => {
 let artist = 'Paak'
 request.get(`${addr}/search?artist=${artist}`, 
   { json:true }, 
   function (err, res, body) {
      t.notOk(err,err,
        'no errors')
      t.equals(body.length, 1,
        'found exactly 1 result when searching for ' + artist)
      t.deepEquals(body[0].artist, 'Anderson .Paak',
        'found the Anderson .Paak album')
      t.end()
   })
})

test('TODO should find 1 result on /search?album=Malib', t => {
  t.end()
})

test('TODO should find 1 result on /search?album=M&artist=Paak', t => {
  t.end()
})

test.onFinish(_ => server.close())
