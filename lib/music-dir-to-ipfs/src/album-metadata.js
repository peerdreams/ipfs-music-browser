let truthy = x => !!x
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

function picture (tracks) {
  // find all the pictures we can from tracks
  let pictures = tracks
      .map(t => t.picture)
      .filter(truthy)
  // take the first one, if it exists
  if (pictures[0])
    return pictures[0]
  // otherwise, no picture
  return null
}

function albumMetadata (tracks) {
  return {
    artist: tracks[0].artist[0],
    album: albumName(tracks),
    picture: picture(tracks),
  }
}

module.exports = albumMetadata
