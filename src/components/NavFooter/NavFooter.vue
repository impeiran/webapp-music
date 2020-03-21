<script>
import { Tabbar, TabbarItem } from 'vant'

export default {
  components: {
    Tabbar, TabbarItem
  },

  data () {
    return {
      activeNav: 'home',
      navList: [
        { title: '首页', name: 'home', icon: 'wap-home-o', to: '/home' },
        { title: '排行榜', name: 'rank', icon: 'chart-trending-o', to: '/rank' },
        { title: '歌手', name: 'singer', icon: 'friends-o', to: '/singer/list' }
      ]
    }
  }
}
</script>

<template>
  <tabbar v-model="activeNav" route>
    <tabbar-item 
      v-for="item in navList"
      :key="item.name"
      :name="item.name"
      :icon="item.icon"
      :to="item.to"
    >{{ item.title }}</tabbar-item>
  </tabbar>
</template>