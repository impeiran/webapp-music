import songItemAdapter from './song-item'

export default (value) => {

  return {
    name: value.dissname,
    pic: value.logo,
    listenNum: value.visitnum,
    total: value.songnum,
    list: value.songlist.map(songItemAdapter)
  }
}