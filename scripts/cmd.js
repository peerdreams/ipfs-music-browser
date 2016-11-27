#!/usr/bin/env node
let argv = require('minimist')(process.argv.slice(2), {
  default: {
    ipfsPort: 5001,
    db: 'library.db'
  }
})
let uploadDir = argv.path ? argv.path : argv._[0]

/*
  IPFS stuff

  Set up an IPFS client.
  Caller can specify port of IPFS
  daemon's HTTP interface with e.g. --port=9999
  */

let ipfsAPI = require('ipfs-api')
let ipfs = ipfsAPI('localhost',
                   argv.ipfsPort, {
                     protocol: 'http'
                   })
let addMusicFolder = require('../lib/music-dir-to-ipfs')

/*
  DB stuff

  Load our database,
  creating it if it doesn't exist.
  Caller can specify db location
  with e.g. --db=~/my-library.db
  */
let sqlite = require('sqlite3');
let db = new sqlite.Database(argv.db)

function add (hash, album, cb) {
  let query =
      `INSERT INTO albums (album, artist, ipfs_hash)
  VALUES ("${album.album}", "${album.artist}", "${argv._[0]}");`
  db.run(query, cb)
}

/*
  Main

  Add stuff to IPFS, calling back on IPFS `hash` of folder and `album` (metadata)
  Then add this album metadata, and ipfs hash, to our sqlite db
  */

addMusicFolder(ipfs, uploadDir, (err, hash, album) => {
  if (err) throw err
  else add(hash, album, function (err, res) {
    if (err) throw err
    console.log('added', album.album, hash)
  })
})


