import axios from 'axios'
import jsonp from './config'

export function getHomeData () {
  const url = 'chaser/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    _: +new Date()
  }

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getRankData () {
  const url = 'chaser/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    _: +new Date()
  }

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getHotAlbum (tid) {
  const url = '/hot/gethotalbum'

  const data = {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    new_format: 1,
    pic: 500,
    disstid: tid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    picmid: 1,
    nosign: 1,
    song_begin: 0,
    // song_num: 15,
    _: +new Date()
  }

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getRankAlbum (id) {
  const url = 'chaser/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    tpl: 3,
    page: 'detail',
    type: 'top',
    topid: id,
    _: +new Date()
  }

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getHotKey () {
  const url = 'chaser/splcloud/fcgi-bin/gethotkey.fcg'

  const data = {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    _: +new Date()
  }

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function search (keyword, page, withSinger, perpage) {
  const url = '/search'

  const data = {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    w: keyword,
    zhidaqu: 1,
    catZhida: withSinger,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage,
    n: perpage,
    p: page,
    remoteplace: 'txt.mqq.all',
    _: +new Date()
  }

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getSingerData (mid) {
  const url = 'chaser/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = {
    singermid: mid,
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5page',
    needNewCode: 1,
    order: 'listen',
    from: 'h5',
    // num: 15,
    begin: 0,
    _: +new Date()
  }

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getMusicVkey (mid) {
  const url = `chaser/base/fcgi-bin/fcg_music_express_mobile3.fcg`
  const cname = 'MusicJsonCallback' + (Math.random() + '').replace('0.', '')
  const data = {
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
  const options = {
    param: 'callback'
  }
  return jsonp(url, data, options)
}

export function getLyric (mid) {
  const url = 'Tec/music/api/lyric'

  const data = {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
