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
        <div class="lyric" ref="lyricBox">
          <scroll ref="lyricList" :data="currentLyric && currentLyric.lines" class="lyric-inner" >
            <div>
              <div v-if="currentLyric">
              <p class="text"
                ref="lyricLine"
                :class="{'current': currentLineNum === index}"
                v-for="(line,index) in currentLyric.lines"
                :key="index">{{line.txt}}</p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="progress-wrapper">
          <span class="time-l">{{format(currentTime)}}</span>
          <div class="progress-bar-wrapper">
            <progress-bar :percent="percent" @percentChange="onPercentChange"></progress-bar>
          </div>
          <span class="time-r">{{format(currentSong.duration)}}</span>
        </div>
        <div class="operator">
          <i @click="togglePlayMode" :class="playMode"></i>
          <i @click="prev" class="iconfont icon-prev"></i>
          <i @click="togglePlaying" class="iconfont" :class="playIcon"></i>
          <i @click="next" class="iconfont icon-next"></i>
          <a class="iconfont icon-music" :href="currentUrl" :download="currentSong.name + '.m4a'"></a>
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
          <i @click.stop="prev" class="iconfont icon-prev"></i>
          <i @click.stop="togglePlaying" class="iconfont" :class="playIcon"></i>
          <i @click.stop="next" class="iconfont icon-next"></i>
        </div>
     </div>
    </transition>
    <audio ref="audio" :src="currentUrl"
          @canplay="ready"
          @error="error"
          @timeupdate="updateTime"
          @ended="end"></audio>
  </div>
</template>

<script>
import {getMusicVkey, getLyric} from 'api/index.js'
import {mapGetters, mapMutations} from 'vuex'
import progressBar from 'components/base/progressBar'
import scroll from 'components/base/scroll'
import {gobase64} from 'common/js/lyric'
import Lyric from 'lyric-parser'

export default {
  components: {
    progressBar,
    scroll
  },
  data () {
    return {
      currentUrl: '',
      songReady: false,
      currentTime: '',
      currentLyric: null,
      currentLineNum: 0,
      playingLyric: ''
    }
  },
  computed: {
    playIcon () {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    picRt () {
      return this.playing ? 'play' : 'play pause'
    },
    percent () {
      return this.currentTime / this.currentSong.duration
    },
    playMode () {
      return this.mode === 0 ? 'iconfont icon-list' : 'iconfont icon-one-loop'
    },
    midLine () {
      const boxHeightHalf = this.$refs.lyricBox.offsetHeight / 2
      const lineHeight = 32
      return Math.floor(boxHeightHalf / lineHeight) - 1
    },
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'playing',
      'currentIndex',
      'mode'
    ])
  },
  methods: {
    down () {
      this.setFullScreen(false)
    },
    up () {
      this.setFullScreen(true)
    },
    prev () {
      if (!this.songReady) {
        return
      }
      if (this.currentIndex === 0) {
        this.setCurrentIndex(this.playlist.length - 1)
      } else {
        this.setCurrentIndex(this.currentIndex - 1)
      }
      if (!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    next () {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex + 1
      if (index === this.playlist.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    loop () {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      this.setPlayingState(true)
      if (this.currentLyric) {
        this.currentLyric.seek(0)
      }
    },
    end () {
      if (this.mode === 1) {
        this.loop()
      } else if (this.mode === 0) {
        this.next()
      }
    },
    handleLyric ({ lineNum, txt }) {
      this.currentLineNum = lineNum
      if (lineNum > this.midLine) {
        let lineEl = this.$refs.lyricLine[lineNum - this.midLine]
        this.$refs.lyricList.scrollToElement(lineEl, 200)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 100)
      }
      this.playingLyric = txt
    },
    togglePlaying () {
      this.setPlayingState(!this.playing)
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    togglePlayMode () {
      const mode = (this.mode + 1) % 2
      this.setPlayMode(mode)
    },
    ready () {
      this.songReady = true
    },
    error () {
      this.songReady = true
    },
    _pad (num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    format (interval) {
      interval = interval | 0
      const minute = interval / 60 | 0
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    onPercentChange (percent) {
      const currentTime = this.currentSong.duration * percent
      this.$refs.audio.currentTime = currentTime
      if (!this.playing) {
        this.togglePlaying()
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
      }
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE'
    })
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (!newSong.id) {
        return
      }
      if (newSong.id === oldSong.id) {
        return
      }
      if (this.currentLyric) {
        this.currentLyric.stop()
        this.currentTime = 0
        this.playingLyric = ''
        this.currentLineNum = 0
        this.$refs.lyricList.scrollTo(0, 0, 100)
      }
      getMusicVkey(newSong.mid).then(res => {
        if (!res.code) {
          this.currentUrl = `http://dl.stream.qqmusic.qq.com/C400${newSong.mid}.m4a?guid=5290231985&vkey=${res.data.items[0].vkey}&uin=0&fromtag=38`
          this.$nextTick(() => {
            this.$refs.audio.play()
            getLyric(newSong.mid).then(res => {
              this.currentLyric = new Lyric(gobase64(res.lyric), this.handleLyric)
              this.$refs.lyricList.refresh()
              if (this.playing) {
                this.currentLyric.play()
              }
            }).catch(() => {
              this.currentLyric = null
              this.playingLyric = ''
              this.currentLineNum = 0
            })
          })
        }
      })
      // clearTimeout(this.timer)
      // this.timer = setTimeout(() => {
      //   this.$refs.audio.play()
      // }, 20)
    },
    playing (newPlaying) {
      if (this.currentUrl) {
        this.$nextTick(() => {
          const audio = this.$refs.audio
          newPlaying ? audio.play() : audio.pause()
        })
      }
    }
    // currentUrl (newUrl) {
    //   console.log(newUrl)
    //   if (newUrl && this.songReady && this.playing) {
    //     this.$nextTick(() => {
    //       this.$refs.audio.play()
    //     })
    //   }
    // }
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
        height: 100%;
        overflow: hidden;
        text-align: center;
        .lyric-inner{
          height: 100%;
          overflow: hidden;
        }
        .text{
          line-height: 32px;
          color: #aaa;
          font-size: $font-size-medium;
          &.current{
            color: #fff;
          }
        }
      }
      .progress-wrapper{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 50px;
        .time-l, .time-r{
          display: inline-block;
          width: 28px;
          text-align: center;
          font-size: $font-size-medium;
        }
        .progress-bar-wrapper{
          margin: 0 14px;
          width: 62%;
        }
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
