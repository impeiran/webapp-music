import axios from 'axios'

export function getHomeData () {
  const url = 'api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

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
  const url = 'api/v8/fcg-bin/fcg_myqq_toplist.fcg'

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

export function getRankAlbum (id) {
  const url = 'api/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

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
