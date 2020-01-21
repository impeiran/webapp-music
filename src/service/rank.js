import Axios from 'axios'

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
  })
}