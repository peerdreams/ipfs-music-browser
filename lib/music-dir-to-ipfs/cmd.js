#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2), {
  default: {
    ipfsPort: 5001,
  }
});
let uploadDir = argv.path ? argv.path : argv._[0]
var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('localhost', argv.ipfsPort, {protocol: 'http'}) 
var addMusicFolder = require('.')
addMusicFolder(ipfs, uploadDir, (err, res) => {
  if (err) throw err
  else console.log(res)
})
