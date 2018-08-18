export default class hot {
  constructor (target) {
    this.name = target.dissname
    this.pic = target.logo
    this.songlist = this.getSongFilt(target.songlist)
  }
  getSongFilt (songlist) {
    let songFilter = []
    for (let val of songlist) {
      let obj = {}
      let singer = []
      obj.id = val.id
      obj.mid = val.mid
      obj.name = val.title
      obj.album = val.album
      obj.duration = val.interval
      obj.pic = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${val.album.mid}.jpg?max_age=2592000`
      for (let i of val.singer) {
        singer.push(i.name)
      }
      obj.singer = singer.join(' / ')
      songFilter.push(obj)
    }
    return songFilter
  }
}
