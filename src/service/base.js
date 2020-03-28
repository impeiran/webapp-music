import jsonp from 'jsonp'
import qs from 'qs'
import vkeyAdapter from '@/adapter/vkey'
import Axios from 'axios'

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

/**
 * 获取Vkey
 * @param {String} mid 歌曲mid
 */
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

/**
 * 获取歌曲歌词
 * @param {String} mid 歌曲mid
 */
export const getLyric = (mid) => {
  const url = '/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  const params = {
    '-': 'MusicJsonCallback_lrc',
    pcachetime: Date.now(),
    songmid: mid,
    g_tk_new_20200303: 1742179805,
    g_tk: 1742179805,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  }

  return Axios.get(url, { params }).then(res => {
    if (res.data.code != 0) return Promise.reject(res.data)

    return res.data.lyric
  }).catch(err => Promise.reject(err))
}