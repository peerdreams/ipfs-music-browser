var mm = require('musicmetadata');
let last = arr => arr[arr.length-1]
var join = require('path').join
var readdir = require('fs').readdir
var read = require('fs').createReadStream
var kefir = require('kefir')
let truthy = x => !!x
let write = require('fs').writeFile
let exec = require('child_process').exec
let metadataFrom = require('./album-metadata')

function mdataS (hash, path) {
  return kefir.fromNodeCallback(cb => {
    return mm(read(path), (err, res) => {
      if (err || !res.title) return cb()
      res.ipfsHash = hash
      return cb(null,res)
    })
  })
}

function mdataFromS (ipfsData) {
  return mdataS(ipfsData.hash, ipfsData.path)
}

function albumMetadata (songsMetadata) {
  let exemplar = songsMetadata[0]
  return {
    tracks: songsMetadata,
    album: exemplar.album,
    artist: exemplar.artist,
    year: exemplar.year,
  }
}

// stream of `ipfs add` results
function addToIpfsS (ipfs, path) {
  return kefir.fromNodeCallback(cb => {
    ipfs.util.addFromFs(path, cb)
  }).map(r => r[0])
}

function writeS (path, jsobj) {
  return kefir.fromNodeCallback(cb => {
    return write(path,
                 JSON.stringify(jsobj),
                 cb)
  })
}

// HACK js-ipfs-api couldn't handle some characters in folder names
//      so, we use exec to trigger ipfs daemon stuff
//      it's really hacky, but 
//      see https://github.com/ipfs/js-ipfs-api/issues/450
// stream of `ipfs add` results
function addDirToIpfsS (ipfs, dir) {
  return kefir.fromNodeCallback(cb => {
    exec(`ipfs add -r "${dir}"`, cb)
  })
  // return just the ipfs hash of the dir
    .map(x=>x.split('\n'))
    .map(x=>x[x.length-2])
    .map(x => x.split(' ')[1])
}

// remove the picture field from each track in the tracklist
// these make tracks.json bigger than it needs to be
function removePicture (tracks) {
  return tracks.map(t => {
    delete t.picture
    return t
  })
}

function addAll (ipfs, dir, cb) {
  return readdir(dir, (err, files) => {
    if (!files) throw 'No files found!'
    let paths = files.map(fn => join(dir, fn))
    let ipfsDataS = kefir.combine(
      paths.map(path => addToIpfsS(ipfs,path))
    )
    let tracksJsonPath = join(dir, 'tracks.json')

    function allTracksMetadataS (ipfsUploadedFiles) {
      return kefir.combine(
        ipfsUploadedFiles
          .map(mdataFromS))
        .map(lst => lst.filter(truthy))
        .map(ts => {
          let album = metadataFrom(ts)
          album.tracks = removePicture(ts)
          return album
        })
    }


    let tracks = null
    ipfsDataS
      .flatMap(allTracksMetadataS)
      .map(ts=> {
        tracks=ts
        return ts
      })
      .flatMap(lst => writeS(tracksJsonPath, lst))
      .flatMap(_ => addDirToIpfsS(ipfs, dir))
      .onValue(x => cb(null, x, tracks))

    ipfsDataS
      .onError(cb)

  })
}

module.exports = addAll
