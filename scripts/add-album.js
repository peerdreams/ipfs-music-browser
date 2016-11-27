const ipfsAPI = require('ipfs-api')
const ipfs = ipfsAPI()
const streamToString = require('stream-to-string')
const sqlite = require('sqlite3');
const albumMetadata = require('../lib/album-metadata.js')
const argv = require('minimist')(process.argv.slice(2), {
  default: {
    db: 'library.db'
  }
});

const db = new sqlite.Database(argv.db)

function getHash(ipfsNode) {
	const tracksLink = ipfsNode.links.filter(function(link) {
			return link.name == 'tracks.json'
		})[0]
  if (tracksLink)
    return tracksLink.toJSON().multihash
}

ipfs.object.get(argv._[0])
	.then((ipfsNode) => getHash(ipfsNode))
	.then((hash) => ipfs.get(hash))
	.then((stream) => streamToString(stream.read().content))
	.then((string) => {
		const tracks = JSON.parse(string)
		let albums = albumMetadata(tracks)
    db.run(
    	`INSERT INTO albums (album, artist, ipfs_hash) 
    	 VALUES ("${albums.album}", "${albums.artist}", "${argv._[0]}");`
  	);
	})
  .catch(function(e) {
    console.log("Error fetching hash: " + argv._[0])
  })
