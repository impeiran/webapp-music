<template>
  <transition name="slide">
    <div class="album-detail">
      <div class="goback" @click="back">
        <i class="iconfont icon-back"></i>
      </div>
      <div class="album-info" ref="info">
        <div class="bg" :style="bgPic"></div>
        <div class="content">
          <div class="title">
            {{data.name}}
          </div>
          <img v-lazy="data.pic">
          <div class="btn" v-show="data.songlist">
            <i class="iconfont icon-play"></i>
            <span>播放全部</span>
          </div>
        </div>
      </div>
      <div class="song-list">
        <scroll  class="song-scroll" :probe-type="probeType" @scroll="scroll"
          :listen-scroll="listenScroll" >
          <div>
            <album-song v-for="(item, index) in data.songlist" :key="item.id" :data="item" :index="index"></album-song>
          </div>
          <div class="loading-wrapper" v-show="!data.songlist">
            <loading></loading>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
import scroll from 'components/base/scroll'
import loading from 'components/base/loading'
import albumSong from 'components/base/albumSong'
import {prefixStyle} from 'common/js/dom.js'

const transform = prefixStyle('transform')

export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      bgLimit: -208,
      probeType: 3,
      listenScroll: true,
      scrollY: 0
    }
  },
  components: {
    scroll,
    loading,
    albumSong
  },
  computed: {
    bgPic () {
      return `background-image:url(${this.data.pic})`
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    scroll (pos) {
      this.scrollY = pos.y
    }
  },
  watch: {
    scrollY (newY) {
      if (newY < 0) {
        this.$refs.info.style[transform] = `translate3d(0,${Math.max(newY, this.bgLimit)}px,0)`
      } else {
        this.$refs.info.style[transform] = 'translate3d(0,0,0)'
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/variable.scss';
.album-detail{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  background: $bgColor;
  .goback{
    width: 50px;
    height: 50px;
    line-height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    text-align: center;
    z-index: 200;
    .iconfont{
    font-size: 24px;
    color: $themeColor;
    }
  }
  .album-info{
    width: 100%;
    height: 276px;
    position: relative;
    top: 0;
    background: #333;
    overflow: hidden;
    z-index: 100;
    .bg{
      width: 100%;
      height: 100%;
      filter: blur(20px);
      z-index: -1;
    }
    .content{
      width: 100%;
      position: absolute;
      top: 0;
      text-align: center;
      .title{
        margin: 20px;
        height: 18px;
        line-height: 18px;
        font-size: $font-size-large;
      }
      img{
        width: 140px;
        height: 140px;
        margin-top: 10px;
      }
      .btn{
        width: 140px;
        margin: 12px auto 19px;
        padding: 4px 10px;
        color: $themeColor;
        border: 1px solid $themeColor;
        border-radius: 14px;
        .iconfont{
          font-size: 24px;
          vertical-align: middle;
        }
        span{
          font-size: $font-size-medium-x;
          vertical-align: middle;
        }
      }
    }
  }
  .cap{
    position: relative;
    top: 0;
  }
  .song-list{
    position: fixed;
    top: 276px;
    bottom: 0;
    width: 100%;
    padding: 20px 20px 0;
    box-sizing: border-box;
    .song-scroll{
      height: 100%;
    }
  }
}
.slide-enter-active, .slide-leave-active{
  transition: transform 0.2s;
}
.slide-enter, .slide-leave-to{
  transform: translate3d(100%,0,0);
}
</style>
