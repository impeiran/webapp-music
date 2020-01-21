import Axios from "axios"

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
