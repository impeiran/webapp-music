import {getMusicVkey} from 'api/index.js'

export default class Album {
  constructor (target) {
    this.name = target.topinfo.ListName
    this.pic = target.topinfo.pic_album
    this.songlist = this.getSongFilt(target.songlist)
  }
  getSongFilt (songlist) {
    let songFilter = []
    for (let val of songlist) {
      let obj = {}
      let singer = []
      obj.id = val.data.songid
      obj.mid = val.data.songmid
      obj.name = val.data.songname
      obj.albumid = val.data.albummid
      obj.duration = val.data.interval
      obj.pic = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${val.data.albummid}.jpg?max_age=2592000`
      for (let i of val.data.singer) {
        singer.push(i.name)
      }
      obj.singer = singer.join(' / ')
      songFilter.push(obj)
    }
    return songFilter
  }
  getVkey (mid) {
    getMusicVkey(mid).then(res => {
      if (!res.code) {
        return res.data.items[0].vkey
      }
    })
  }
}
