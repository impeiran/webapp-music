import Vue from 'vue'
import VueRouter from 'vue-router'
import { collectCacheRoutes } from '@/store'
import Layout from '@/layout/Base'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        meta: { 
          title: '首页',
          cached: true
        },
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home/Home')
      },

      {
        meta: { 
          title: '排行榜',
          cached: true
        },
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
      },

      {
        meta: { 
          title: '专辑' ,
          hideSearchBar: true
        },
        path: '/album/:id',
        name: 'album',
        component: () => import('@/views/Album/Album.vue')
      },

      {
        meta: { 
          title: '歌单' ,
          hideSearchBar: true
        },
        path: '/song_sheet/:id',
        name: 'songSheetPage',
        component: () => import('@/views/SongSheet/SongSheet.vue')
      },

      {
        path: '/singer',
        redirect: '/singer/list',
      },

      {
        meta: {
          title: '歌手列表',
          cached: true,
          hideSearchBar: true
        },
        path: '/singer/list',
        name: 'singerList',
        component: () => import('@/views/Singer/SingerList')
      },

      {
        meta: {
          title: '歌手',
          hideSearchBar: true
        },
        path: '/singer/:mid',
        name: 'singer',
        component: () => import('@/views/Singer/Singer')
      }
    ]
  },
]

collectCacheRoutes(routes)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
