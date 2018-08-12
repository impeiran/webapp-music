<template>
  <div class="home">
    <scroll  class="home-content">
      <div>
        <home-swiper :slider="slider"></home-swiper>
        <home-list :albumList="songList"></home-list>
      </div>
      <div class="loading-wrapper" v-show="!slider.length || !songList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getHomeData } from 'api/index.js'
import scroll from 'components/base/scroll'
import homeSwiper from 'components/homeSwiper/homeSwiper'
import homeList from 'components/homeList/homeList'
import loading from 'components/base/loading'

export default {
  components: {
    scroll,
    homeSwiper,
    homeList,
    loading
  },
  data () {
    return {
      slider: [],
      songList: []
    }
  },
  methods: {
    getHome () {
      getHomeData().then(res => {
        if (!res.code) {
          this.slider = res.data.slider
          this.songList = res.data.songList
        }
      })
    }
  },
  mounted () {
    this.getHome()
  }
}
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
  position: fixed;
  top: 96px;
  bottom: 0;
  .home-content{
    height: 100%;
    overflow: hidden;
  }
}
</style>
