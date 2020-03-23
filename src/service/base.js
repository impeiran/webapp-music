/**
 * 获取歌手图片
 * @param {String} mid 歌手mid
 */
export const getSingerAvatar = mid => {
  return `https://y.gtimg.cn/music/photo_new/T001R300x300M000${mid}.jpg?max_age=2592000`
}

/**
 * 获取歌曲url
 * @param {String} mid 歌曲mid
 * @param {String} vkey 用于QQ音乐的expire与验证
 */
export const getSongUrl = (mid, vkey) => {
  return `http://dl.stream.qqmusic.qq.com/C400${mid}.m4a?guid=5290231985&vkey=${vkey}&uin=0&fromtag=38`
}