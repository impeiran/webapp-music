import songItemAdapter from './song-item'

/**
 * 过滤歌手歌曲信息数据
 * @param {Object} data 歌手歌曲信息
 */
const singerSongListAdapter = data => {
  return {
    name: '',
    pic: '',
    list: data.songList.map(item => songItemAdapter(item.songInfo || {})),
    total: data.totalNum,
  }
}

export default singerSongListAdapter