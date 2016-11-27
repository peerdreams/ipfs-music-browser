var join = require('path').join
// var exampleFolder = 'example-music-dir'
var exampleFolder = 'The Dip - The Dip (2015) [MP3 V0]'
var dir = join(__dirname,exampleFolder)
var ipfsAPI = require('ipfs-api')
// connect to ipfs daemon API server
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'}) 
var metadata = require('..')
metadata(ipfs, dir, (err, res) => {
  if (err) throw err
  else console.log(res)
})
