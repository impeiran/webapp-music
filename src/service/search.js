import Axios from "axios"
import searchAdapter from '@/adapter/search'

/**
 * 搜索
 */
export const searchSingerAndSong = (keyword, page = 1, pageSize = 30, withSinger = 1) => {
  const url = '/soso/fcgi-bin/search_for_qq_cp'

  const params = {
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
    pageSize,
    n: pageSize,
    p: page,
    remoteplace: 'txt.mqq.all',
    _: +new Date()
  }

  return Axios.get(url, { params }).then(res => {
    res = res.data
    if (res.code != 0) return Promise.reject(res)

    return searchAdapter(res.data || {})
  }).catch(err => Promise.reject(err))
}