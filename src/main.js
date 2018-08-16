// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyLoad from 'vue-lazyload'
import store from './store'

import 'swiper/dist/css/swiper.css'

// window.MessageChannel = noop
// window.setImmediate = noop

Vue.config.productionTip = false

fastClick.attach(document.body)

Vue.use(VueAwesomeSwiper)

Vue.use(VueLazyLoad, {
  loading: require('common/img/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})

// function noop () {
// }
