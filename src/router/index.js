import Vue from 'vue'
import Router from 'vue-router'
import home from 'components/home/home'
import rank from 'components/rank/rank'
import search from 'components/search/search'
import album from 'components/album/album'

Vue.use(Router)

// const home = (resolve) => {
//   import('components/home/home').then((module) => {
//     resolve(module)
//   })
// }
// const rank = (resolve) => {
//   import('components/rank/rank').then((module) => {
//     resolve(module)
//   })
// }
// const search = (resolve) => {
//   import('components/search/search').then((module) => {
//     resolve(module)
//   })
// }

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/rank',
      component: rank,
      children: [
        {
          path: ':id',
          component: album
        }
      ]
    },
    {
      path: '/search',
      component: search
    }
  ]
})
