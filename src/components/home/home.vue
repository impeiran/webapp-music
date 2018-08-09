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
import axios from 'axios'
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
      axios.get('api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1531362909109'
      )
        .then((res) => {
          if (!res.data.code) {
            let data = res.data.data
            this.slider = data.slider
            this.songList = data.songList
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
