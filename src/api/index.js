import axios from 'axios'
import jsonp from './config'

// 获取主页数据
export function getHomeData () {
  const url = '/chasermusic/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

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

// 获取排名数据
export function getRankData () {
  const url = '/chasermusic/v8/fcg-bin/fcg_myqq_toplist.fcg'

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

// 获取热门专辑
export function getHotAlbum (tid) {
  const url = '/chasermusic_gethotalbum/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

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

// 获取排名专辑
export function getRankAlbum (id) {
  const url = '/chasermusic/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

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

// 获取热门搜索词
export function getHotKey () {
  const url = '/chasermusic/splcloud/fcgi-bin/gethotkey.fcg'

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

// 搜索
export function search (keyword, page, withSinger, perpage) {
  const url = '/chasermusic_search/soso/fcgi-bin/search_for_qq_cp'

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

// 获取歌手数据
export function getSingerData (mid) {
  const url = '/chasermusic/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

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

// 获取vkey （调用歌曲必备key）
export function getMusicVkey (mid) {
  const url = `/chasermusic/base/fcgi-bin/fcg_music_express_mobile3.fcg`
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

// 获取歌词
export function getLyric (mid) {
  const url = '/chasertec/music/api/lyric'

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

export function genMusicUrl (mid, vkey) {
  return `http://dl.stream.qqmusic.qq.com/C400${mid}.m4a?guid=5290231985&vkey=${vkey}&uin=0&fromtag=38`
}
