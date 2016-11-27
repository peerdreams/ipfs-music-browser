const ipfsAPI = require('ipfs-api')
const ipfs = ipfsAPI()
const streamToString = require('stream-to-string')
const sqlite = require('sqlite3');
var db = new sqlite.Database('library.db')


function getHash(ipfsNode) {
	const tracksLink = ipfsNode.links.filter(function(link) {
			return link.name == 'tracks.json'
		})[0]
	return tracksLink.toJSON().multihash
}

// returns 1 album name for all the tracks
// or throws an error
function albumName (tracks) {
  const albums = tracks.reduce(function (acc, cur) {
    if (!acc)
      return cur.album
    if (acc !== cur.album)
      throw 'Not all albums match!'
    return acc
  }, null)
  return albums
}

function albumMetadata (tracks) {
  return {
    artist: tracks[0].artist[0],
    album: albumName(tracks),
  }
}

let tracksHash;

ipfs.object.get(process.argv[2])
	.then((ipfsNode) => {
		tracksHash = getHash(ipfsNode)
		return tracksHash;
	})
	.then((hash) => ipfs.get(hash))
	.then((stream) => streamToString(stream.read().content))
	.then((string) => {
		const tracks = JSON.parse(string)
		let albums = albumMetadata(tracks)
    db.run(
    	`INSERT INTO albums (album, artist, ipfs_hash) 
    	 VALUES ("${albums.album}", "${albums.artist}", "${tracksHash}");`
  	);
	})
