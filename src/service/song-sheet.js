import Axios from 'axios'
import songSheetAdapter from '@/adapter/song-sheet'

/**
 * 获取指定歌单信息
 * @param {Number} id 
 */
export const getSongSheetInfo = id => {
  const url = '/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  const params = {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    new_format: 1,
    disstid: id,
    g_tk_new_20200303: 947277503,
    g_tk: 947277503,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  }

  return Axios.get(url, { params }).then(res => {
    res = res.data
    if (res.code != 0) return Promise.reject(res)

    return res.cdlist ? songSheetAdapter(res.cdlist[0]) : {}
  }).catch(err => Promise.reject(err))
}