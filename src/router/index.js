import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/Base'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        meta: { title: '首页' },
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home/index.js')
      },

      {
        meta: { title: '排行榜' },
        path: 'rank',
        name: 'rank',
        component: () => import('@/views/Rank/index.js')
      },

      {
        meta: { 
          title: '搜索' ,
          hideSearchBar: true
        },
        path: 'search',
        name: 'search',
        component: () => import('@/views/Search/index.js')
      }
    ]
  },

  {
    path: '/singer',
    redirect: '/singer/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'singerList',
        component: () => import('@/views/Singer/index.js')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
