import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const homeHeader = (resolve) => {
//   import('components/homeHeader/homeHeader').then((module) => {
//     resolve(module)
//   })
// }
export default new Router({
  routes: [
    {
      path: '/'
    }
  ]
})
