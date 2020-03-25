/**
 * 过滤vkey接口字段
 * @param {Object} data 
 */
const vkeyAdapter = data => {
  return data.items ? data.items[0]?.vkey || '' : ''
}

export default vkeyAdapter
