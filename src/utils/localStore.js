const LS = window.localStorage

export default {
  set (key, value = '', option = {}) {
    LS.setItem(key, JSON.stringify({
      expire: option.expire ? Date.now() + option.expire : -1,
      data: value
    }))
  },

  get (key) {
    let info = LS.getItem(key)
    try {
      info = JSON.parse(info)

      if (info.expire == -1) return info.value

      if (Date.now() > info.expire) return undefined

      return info.data

    } catch {
      return undefined
    }
  }
}