export default class Singer {
  constructor (target) {
    this.name = target.singer_name
    this.mid = target.singer_mid
    this.pic = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.mid}.jpg?max_age=2592000`
    this.songlist = this.getSongFilt(target.list)
  }
  getSongFilt (songlist) {
    let songFilter = []
    for (let val of songlist) {
      let obj = {}
      let singer = []
      obj.id = val.musicData.songid
      obj.mid = val.musicData.songmid
      obj.name = val.musicData.songname
      obj.albumid = val.musicData.albummid
      obj.duration = val.musicData.interval
      obj.pic = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${val.musicData.albummid}.jpg?max_age=2592000`
      for (let i of val.musicData.singer) {
        singer.push(i.name)
      }
      obj.singer = singer.join(' / ')
      songFilter.push(obj)
    }
    return songFilter
  }
}
