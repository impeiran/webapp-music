/**
 * 过滤单首歌曲字段
 * @param {Object} data 歌曲信息
 */
const songItemAdapter = (data) => {
  return {
    songId: data.songId || data.id,
    songMid: data.songmid || data.mid,
    songName: data.songname || data.name || data.title,
    singer: (data.singer || []).map(item => item.name).join('/'),
    albumId: data.albumid,
    albumMid: data.albumMid,
    albumName: data.albumname,
    interval: data.interval
  }
}

export default songItemAdapter
