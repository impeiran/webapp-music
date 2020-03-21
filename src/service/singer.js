import Axios from 'axios'
import ure from 'ure'

const genRandomNum = len => {
  let ret = ''
  while (len-- > -1) {
    ret += ure.random(0, 10),toString()
  }
  return ret
}

const genDefaultOption = (option = {}) => {
  return {
    '-': `getUCGI${genRandomNum(16)}`,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: JSON.stringify({
      "comm": {
        "ct": 24,
        "cv": 0
      },
      "singerList": {
        "module": "Music.SingerListServer",
        "method": "get_singer_list",
        "param": Object.assign({
          "area": -100,
          "sex": -100,
          "genre": -100,
          "index": -100,
          "sin": 0,
          "cur_page": 1
        }, option)
      }
    })
  }
}

/**
 * 获取歌手分类
 */
export const getSingerTags = () => {
  const params = genDefaultOption()

  return Axios.get('/cgi-bin/musicu.fcg', { params }).then(({ data: res }) => {
    if (res.code == 0 && res.singerList.code == 0) {
      return Promise.resolve(ure.getValue(res.singerList, 'data.tags', {}))
    } else {
      return Promise.reject(res)
    }
  })
}

/**
 * 获取歌手列表
 * @param {Object} option 
 * {
 *   area     区域ID
 *   genre    分类ID
 *   sex      性别ID
 *   index    首字母ID
 *   cur_page 当前页
 * }
 */
export const getSingerList = (option = {}) => {
  const params = genDefaultOption(option)

  return Axios.get('/cgi-bin/musicu.fcg', { params }).then(({ data: res }) => {
    if (res.code == 0 && res.singerList.code == 0) {
      const result = ure.getValue(res.singerList, 'data', {})
      return Promise.resolve({
        total: result.total,
        singerList: result.singerlist
      })
    } else {
      return Promise.reject(res)
    }
  })
}

/**
 * 获取歌手信息
 * @param {String} mid 
 */
export const getSinger = mid => {

}