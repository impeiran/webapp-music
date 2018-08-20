export default class Result {
  constructor (target) {
    this.curnum = target.song.curnum
    this.curpage = target.song.curpage
    this.songlist = this.getSongFilt(target.song.list)
    // console.log(target.song.list)
  }
  getSongFilt (songlist) {
    let songFilter = []
    for (let val of songlist) {
      let obj = {}
      let singer = []
      obj.id = val.songid
      obj.mid = val.songmid
      obj.name = val.songname
      obj.albumid = val.albummid
      obj.duration = val.interval
      obj.pic = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${val.albummid}.jpg?max_age=2592000`
      for (let i of val.singer) {
        singer.push(i.name)
      }
      obj.singer = singer.join(' / ')
      songFilter.push(obj)
    }
    return songFilter
  }
}
