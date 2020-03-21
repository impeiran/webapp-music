export default (data) => {
  return {
    songId: data.songId,
    songMid: data.songmid,
    songName: data.songname || data.name || data.title,
    singer: (data.singer || []).map(item => item.name).join('/'),
    albumId: data.albumid,
    albumMid: data.albumMid,
    albumName: data.albumname,
    vid: data.vid
  }
}