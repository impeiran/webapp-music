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
      obj.url = `http://dl.stream.qqmusic.qq.com/C400${val.data.songmid}.m4a?guid=5290231985&vkey=490875B7CFCC953CE6E00CD8098C6B8015C899F95C8D74479AB25C10B19BEC21A03389D6D9F6A6451963EABB475DFC59615E56A68664E115&uin=0&fromtag=38`
      for (let i of val.data.singer) {
        singer.push(i.name)
      }
      obj.singer = singer.join(' / ')
      songFilter.push(obj)
    }
    return songFilter
  }
}
