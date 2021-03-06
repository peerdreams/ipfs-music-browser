# music-dir-to-ipfs

add a directory of music to ipfs.

creates a `tracks.json` file with the form:

```js
{
  "album": "album name",
  "artist": "artist name",
  "picture": /* some image buffer... */,
  "tracks": [
    {title, ipfsHash, album, artist, disk, /*...*/ },
    /* ... more songs ... */
  ]
}
```
adds this file to the directory of music,
then adds the entire directory to IPFS

**NOTE** - make sure IPFS daemon is running - `ipfs daemon`


## example

run IPFS daemon, and

```js
var metadata = require('music-dir-to-ipfs')
var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('localhost', 5001, { protocol: 'http' }) 
metadata(ipfs, dir, (err, hash, album) => {
  if (err) throw err
  else console.log(hash, album)
})
```

you'll see an IPFS hash come up.

you can visit `http://localhost:8080/ipfs/[that hash]` 
to view your files.
notice the `tracks.json` file, which should have a list of metadata, and IPFS hashes, for each file.

if your IPFS daemon is running on a different HTTP port on localhost, you can set that port with `--ipfsPort` (5001 is default, so you can omit this option if you just ran `ipfs daemon`)

## api

if you npm install this package from the git repo,

### metadata(ipfs, dir, cb)

`ipfs` is an [ipfs js api](https://github.com/ipfs/js-ipfs-api) instance.

`dir` is a **full path** to a directory filled with music. if other stuff is in the directory, that's ok - as long as some of the files there have ID3 tags (mp3, m4a, ogg, wmv, wva).

`cb` calls back on `(err, ipfsHash, albumMetadata)`

## install

clone this repo and 

```
npm i
```

## license

BSD
