import songItemAdapter from './song-item'

/**
 * 过滤单个歌单字段
 * @param {Object} value 歌单信息
 */
export default (value) => {

  return {
    name: value.dissname,
    pic: value.logo,
    listenNum: value.visitnum,
    total: value.songnum,
    list: value.songlist.map(songItemAdapter)
  }
}