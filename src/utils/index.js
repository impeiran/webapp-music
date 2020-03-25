import ure from 'ure'

/**
 * 转换interval为时间格式 HH:MM:SS
 * @param {Number} duration 
 */
export const transDuration = (duration) => {
  const _prefix = target => target.toString().padStart(2, '0')

  const hour = Math.floor(duration / 3600)
  const minute = Math.floor(
    (duration % 3600) / 60
  )
  const second = duration % 60

  return hour
    ? `${hour}:${_prefix(minute)}:${_prefix(second)}`
    : `${minute}:${_prefix(second)}`
}

/**
 * 获取新的随机数
 * @param {Number} max 
 * @param {Number} prev 
 */
export const getRandom = (max, prev) => {
  let result = 0

  do {
    result = ure.random(0, max)
  } while (result === prev)

  return result
}
