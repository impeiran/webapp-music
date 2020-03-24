import ure from 'ure'
import songItemAdapter from './song-item'

/**
 * 过滤搜索信息的字段
 * @param {Object} data 
 */
const searchAdapter = data => {
  let result = {}

  if (!ure.isEmpty(data.zhida)) {
    const {
      singername,
      singermid,
      songnum
    } = data.zhida

    result = {
      singerName: singername,
      singerMid: singermid,
      songNum: songnum
    }
  }

  const {
    curnum,
    curpage,
    list,
    totalnum
  } = data.song || {}

  result.page = curpage
  result.pageSize = curnum,
  result.list = list.map(songItemAdapter)
  result.total = totalnum

  return result
}

export default searchAdapter