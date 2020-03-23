/**
 * 过滤首页歌单字段
 * @param {Object} value 首页歌单
 */
const homeSheetAdapter = (value) => {
  return {
    tid: value.tid,
    title: value.title,
    pic: value.cover_url_medium,
    playNum: value.access_num
  }
}

export default homeSheetAdapter
