import jsonp from 'jsonp'
import qs from 'qs'
import vkeyAdapter from '@/adapter/vkey'

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

export const getVkey = (mid) => {
  const prefix = process.env.NODE_ENV === 'production' ? '/music' : ''
  let url = prefix + `/base/fcgi-bin/fcg_music_express_mobile3.fcg`
  let cname = 'MusicJsonCallback' + (Math.random() + '').replace('0.', '')
  let params = {
    g_tk: 1235412784,
    hostUin: 0,
    loginUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: '205361747',
    jsonpCallback: cname,
    uin: 0,
    songmid: mid,
    filename: `C400${mid}.m4a`,
    guid: '5290231985'
  }

  url += '?' + qs.stringify(params)

  return new Promise((resolve, reject) => {
    jsonp(url, { param: 'callback' }, (err, data) => {
      if (err || data.code != 0) return reject(err)
      resolve(vkeyAdapter(data.data))
    })
  })
}