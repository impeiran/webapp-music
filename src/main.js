import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { Lazyload } from 'vant'

import './init'

import '@/utils/filter'

import '@/styles/vant-rewrite.scss'
import '@/styles/index.scss'

Vue.use(Lazyload)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
