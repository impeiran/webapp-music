export default (value) => {
  return {
    tid: value.tid,
    title: value.title,
    pic: value.cover_url_medium,
    playNum: value.access_num
  }
}