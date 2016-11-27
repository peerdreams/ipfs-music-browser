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

module.exports = albumMetadata
