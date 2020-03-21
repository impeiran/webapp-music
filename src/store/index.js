import Vue from 'vue'
import Vuex from 'vuex'

import home from './module/home'

Vue.use(Vuex)

export const ADD_CACHE_ROUTE = 'ADD_CACHE_ROUTE'
export const REMOVE_CACHE_ROUTE = 'REMOVE_CACHE_ROUTE'

const store = new Vuex.Store({
  state: {
    cacheRoutes: []
  },

  getters: {
    songSheets (state) {
      return state.home.songSheets
    },

    hotKeys (state) {
      return state.home.hotKeys
    }
  },

  mutations: {
    [ADD_CACHE_ROUTE] ({ cacheRoutes }, name) {
      cacheRoutes.indexOf(name) == -1 &&
      cacheRoutes.push(name)
    },

    [REMOVE_CACHE_ROUTE] ({ cacheRoutes }, name) {
      const index = cacheRoutes.indexOf(name)
      index !== -1 && cacheRoutes.splice(index, 1)
    }
  },

  modules: {
    home
  }
})

/**
 * 收集需要缓存的组件
 * @param {Array} routes 
 */
export const collectCacheRoutes = routes => {
  routes.forEach(routeItem => {
    const { name, meta, children } = routeItem

    if (name && meta && meta.cached) {
      store.commit(ADD_CACHE_ROUTE, name)
    }

    children && collectCacheRoutes(children)
  })
}

export default store
