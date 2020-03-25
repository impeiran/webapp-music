/**
 * 过滤单首歌曲字段
 * @param {Object} data 歌曲信息
 */
const songItemAdapter = (data) => {
  const result ={
    songId: data.songId || data.songid || data.id,
    songMid: data.songmid || data.mid,
    songName: data.songname || data.name || data.title,
    singer: (data.singer || []).map(item => item.name).join('/'),
    albumId: data.albumid || data.albumId || data.album?.id,
    albumMid: data.albummid || data.albumMid || data.album?.mid,
    albumName: data.albumname || data.album?.name,
    interval: data.interval
  }

  result.pic = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${result.albumMid}.jpg?max_age=2592000`

  return result
}

export default songItemAdapter
