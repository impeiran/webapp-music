import Axios from "axios"
import homeSheetAdapter from '@/adapter/home-sheet'

/**
 * 获取首页数据
 */
export const getHomePage = () => {
  const url = '/cgi-bin/musicu.fcg'
  const params = {
    "cgiKey": "getHomePage",
    "_": +new Date(),
    data: JSON.stringify({
      "comm": {
        "g_tk": 5381,
        "uin": "",
        "format": "json",
        "inCharset": "utf-8",
        "outCharset": "utf-8",
        "notice": 0,
        "platform": "h5",
        "needNewCode": 1
      },
      "MusicHallHomePage": {
        "module": "music.musicHall.MusicHallPlatform",
        "method": "MobileWebHome",
        "param": {
          "ShelfId": [
            101,
            102,
            161
          ]
        }
      },
      "hotkey": {
        "module": "tencent_musicsoso_hotkey.HotkeyService",
        "method": "GetHotkeyForQQMusicMobile",
        "param": {
          "remoteplace": "txt.miniapp.wxada7aab80ba27074",
          "searchid": "1559616839293"
        }
      }
    })
  }

  return Axios.get(url, { params }).then(({ data: res }) => {
    if (res.code == 0) {
      return Promise.resolve({
        MusicHallHomePage: res.MusicHallHomePage,
        hotkey: res.hotkey
      })
    } else {
      return Promise.reject(res)
    }
  })
}

/**
 * 获取首页官方歌单列表
 */
export const getOffcialSongSheets = () => {
  const url = '/cgi-bin/musicu.fcg'

  // 歌单分类id，暂时写死
  const id = 3317

  const params = {
    '-': 'recom06208584787980054',
    g_tk: '947277503',
    loginUin: '1070045244',
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: `{"comm":{"ct":24},"playlist":{"method":"get_playlist_by_category","param":{"id":${id},"curPage":1,"size":40,"order":5,"titleid":3317},"module":"playlist.PlayListPlazaServer"}}`
  }

  return Axios.get(url, { params }).then(({ data: res }) => {
    if (res.code == 0) {
      return (res.playlist?.data?.v_playlist || []).map(homeSheetAdapter)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => Promise.reject(err))
}