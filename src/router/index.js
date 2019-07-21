import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('components/home/home'),
      children: [
        {
          path: '/home/hot',
          component: () => import('components/hotAlbum/hotAlbum')
        }
      ]
    },
    {
      path: '/rank',
      component: () => import('components/rank/rank'),
      children: [
        {
          path: '/rank/detail',
          component: () => import('components/rankAlbum/rankAlbum')
        }
      ]
    },
    {
      path: '/search',
      component: () => import('components/search/search'),
      children: [
        {
          path: '/singer',
          component: () => import('components/singer/singer')
        }
      ]
    }
  ]
})
