import vue from 'vue'

vue.prototype.$_playCount = val => {
  return val ? `${(val / 10000).toFixed(1)}万` : ''
}