<template>
  <div class="player" v-show="playlist.length > 0">
    <transition name="normal">
      <div class="normal" v-show="fullScreen">
        <div class="bg-box">
          <img :src="currentSong.pic">
        </div>
        <div class="godown" @click="down">
          <i class="iconfont icon-down"></i>
        </div>
        <div class="top">
          <h1>{{currentSong.name}}</h1>
          <span>{{currentSong.singer}}</span>
        </div>
        <div class="pic-box">
          <img :src="currentSong.pic" :class="picRt">
        </div>
        <div class="lyric"></div>
        <div class="progress-wrapper"></div>
        <div class="operator">
          <i class="iconfont icon-list"></i>
          <i class="iconfont icon-prev"></i>
          <i @click="togglePlaying" class="iconfont" :class="playIcon"></i>
          <i class="iconfont icon-next"></i>
          <i class="iconfont icon-music"></i>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini" v-show="!fullScreen" @click="up">
        <img :src="currentSong.pic" :class="picRt">
        <div class="text-group">
          <span>{{currentSong.name}}</span>
          <span>{{currentSong.singer}}</span>
        </div>
        <div class="mini-operator">
          <i class="iconfont icon-prev"></i>
          <i @click.stop="togglePlaying" class="iconfont" :class="playIcon"></i>
          <i class="iconfont icon-next"></i>
        </div>
     </div>
    </transition>
    <audio ref="audio" :src="currentSong.url"></audio>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  computed: {
    playIcon () {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    picRt () {
      return this.playing ? 'play' : 'play pause'
    },
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'playing'
    ])
  },
  methods: {
    down () {
      this.setFullScreen(false)
    },
    up () {
      this.setFullScreen(true)
    },
    togglePlaying () {
      this.setPlayingState(!this.playing)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE'
    })
  },
  watch: {
    currentSong () {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    playing (newPlaying) {
      this.$nextTick(() => {
        const audio = this.$refs.audio
        newPlaying ? audio.play() : audio.pause()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'common/scss/variable.scss';
  @import 'common/scss/mixin.scss';
  .player{
    .normal{
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 500;
      background: $bgColor;
      .bg-box{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
        opacity: 0.6;
        filter: blur(20px);
        img{
          width: 100%;
          height: 100%;
        }
      }
      .godown{
        position: fixed;
        top: 0;
        left: 0;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: $themeColor;
        z-index: 580;
        .iconfont{
        font-size: 24px;
        }
      }
      .top{
        h1{
          width: 100%;
          height: 50px;
          line-height: 50px;
          padding: 0 50px;
          box-sizing: border-box;
          text-align: center;
          font-size: $font-size-large;
          @include nowrap;
        }
        span{
          display: block;
          width: 100%;
          padding: 0 20%;
          box-sizing: border-box;
          text-align: center;
          font-size: $font-size-medium;
          color: #aaa;
          @include nowrap;
        }
      }
      .pic-box{
        margin: 20px 0 10px;
        text-align: center;
        img{
          width: 180px;
          height: 180px;
          border-radius: 50%;
          border: 10px solid rgba(170, 170, 170, .3);
          &.play{
            animation: rotate 20s linear infinite;
          }
          &.pause{
            animation-play-state: paused
          }
        }
      }
      .lyric{
        flex: 1;
        height: 140px;
        // background-color: #fff;
      }
      .progress-wrapper{
        width: 100%;
        height: 50px;
      }
      .operator{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
        width: 100%;
        height: 50px;
        line-height: 50px;
        .iconfont{
          flex: 1;
          text-align: center;
          font-size: 40px;
          color: $themeColor;
        }
        .iconfont:nth-child(3){
          font-size: 50px;
        }
      }
      &.normal-enter-active, &.normal-leave-active{
        transition: all 0.3s;
        .godown, .top, .progress-wrapper, .operator{
          transition: all 0.3s cubic-bezier(0.86, 0.18, 0.82, 1.32);
        }
      }
      &.normal-enter, &.normal-leave-to{
        opacity: 0;
        .godown, .top{
          transform: translate3d(0, -100px, 0)
        }
        .progress-wrapper, .operator{
          transform: translate3d(0, 200px, 0)
        }
      }
    }
    .mini{
      display: flex;
      align-items: center;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 580;
      width: 100%;
      height: 60px;
      padding: 0 10px;
      box-sizing: border-box;
      align-items: center;
      background: #333;
      img{
        flex: 0 0 40px;
        margin: 0 10px;
        height: 40px;
        border-radius: 50%;
        &.play{
            animation: rotate 20s linear infinite;
          }
        &.pause{
            animation-play-state: paused;
        }
      }
      .text-group{
        flex: 1;
        overflow: hidden;
        @include nowrap;
        span{
          display: block;
          margin-bottom: 4px;
        }
        span:first-child{
          font-size: $font-size-medium;
        }
        span:last-child{
          font-size: $font-size-small;
          color: #aaa;
        }
      }
      .mini-operator{
        flex: 0 0 140px;
        display: flex;
        justify-content: space-around;
        .iconfont{
          font-size: 34px;
          color: $themeColor;
        }
      }
      &.mini-enter-active, &.mini-leave-active{
        transition: all 0.4s;
      }
      &.mini-enter, &.mini-leave-to{
        opacity: 0;
      }
    }
  }

  @keyframes rotate {
    0%{
      transform: rotate(0)
    }
    100%{
      transform: rotate(360deg)
    }
  }
</style>
