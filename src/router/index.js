import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/Base/Layout'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home/index.js')
      },

      {
        path: 'rank',
        name: 'rank',
        component: () => import('@/views/Rank/index.js')
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
