import Axios from 'axios'
import songItemAdapter from '@/adapter/song-item'

/**
 * 获取排行榜列表
 */
export const getRankList = () => {
  const url = '/cgi-bin/musicu.fcg'
  const params = {
    _: +new Date(),
    data: {
      "comm": {
        "g_tk": 5381,
        "uin": "",
        "format": "json",
        "inCharset": "utf-8",
        "outCharset": "utf-8",
        "notice": 0,
        "platform": "h5",
        "needNewCode": 1,
        "ct": 23,
        "cv": 0
      },
      "topList": {
        "module": "musicToplist.ToplistInfoServer",
        "method": "GetAll",
        "param": {}
      }
    }
  }

  return Axios.get(url, { params }).then(({ data: res }) => {
    if (res.code == 0 && res.topList.code == 0) {
      return Promise.resolve(res.topList.data.group.reduce((result, item) => {
        result = result.concat(item.toplist)
        return result
      }, []))
    } else {
      return Promise.reject(res)
    }
  }).catch(err => Promise.reject(err))
}

/**
 * 获取排行榜歌单详情
 * @param {Number} id 排行歌单ID
 */
export const getRank = id => {
  const url = '/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

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

  return Axios.get(url, {
    params: data
  }).then(res => {
    res = res.data
    if (res.code != 0) return Promise.reject(res)

    const { 
      ListName,
      info,
      listennum,
      pic_v12
    } = res.topinfo || {}

    return {
      name: ListName,
      info,
      pic: pic_v12,
      listenNum: listennum,
      list: (res.songlist || []).map(item => songItemAdapter(item.data)),
      total: res.total_song_num
    }
  }).catch(err => Promise.reject(err))
}
