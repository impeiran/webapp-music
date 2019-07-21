import Vue from 'vue'
import Router from 'vue-router'
import home from 'components/home/home'
import rank from 'components/rank/rank'
import search from 'components/search/search'
import rankAlbum from 'components/rankAlbum/rankAlbum'
import hotAlbum from 'components/hotAlbum/hotAlbum'
import singer from 'components/singer/singer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home,
      children: [
        {
          path: '/home/hot',
          component: hotAlbum
        }
      ]
    },
    {
      path: '/rank',
      component: rank,
      children: [
        {
          path: '/rank/detail',
          component: rankAlbum
        }
      ]
    },
    {
      path: '/search',
      component: search,
      children: [
        {
          path: '/singer',
          component: singer
        }
      ]
    }
  ]
})
