<template>
  <div class="home" ref="home">
    <scroll  class="home-content" ref="myscroll">
      <div>
        <home-swiper :slider="slider"></home-swiper>
        <home-list :albumList="songList" @select="selectItem"></home-list>
      </div>
      <div class="loading-wrapper" v-show="!slider.length || !songList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { getHomeData } from 'api/index.js'
import scroll from 'components/base/scroll'
import homeSwiper from 'components/homeSwiper/homeSwiper'
import homeList from 'components/homeList/homeList'
import loading from 'components/base/loading'
import {playlistMixin} from 'common/js/mixin'

export default {
  mixins: [playlistMixin],
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
          console.log(this.songList)
        }
      })
    },
    selectItem (tid) {
      this.$router.push({
        path: '/home/hot',
        query: {
          id: tid
        }
      })
    },
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : '0'
      this.$refs.home.style.bottom = bottom
      this.$refs.myscroll.refresh()
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
  z-index: 10;
  .home-content{
    height: 100%;
    overflow: hidden;
  }
}
</style>
