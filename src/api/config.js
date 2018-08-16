import originJsonp from 'jsonp'

export default function jsonp (url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
        // console.log(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param (data) {
  let query = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    query += '&' + k + '=' + encodeURIComponent(value)
  }
  return query ? query.substring(1) : ''
}
