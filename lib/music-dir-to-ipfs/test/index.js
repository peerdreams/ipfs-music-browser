var join = require('path').join
var exampleFolder = 'example-music-dir'
var dir = join(__dirname,exampleFolder)
var ipfsAPI = require('ipfs-api')
// connect to ipfs daemon API server
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'}) 
var metadata = require('..')
metadata(ipfs, dir, (err, hash, tracks) => {
  if (err) throw err
  else console.log(hash, tracks)
})
