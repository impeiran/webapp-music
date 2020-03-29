<script>
import ure from 'ure'
import Lyric from 'lyric-parser'
import feedback from '@/utils/feedback'
import ControlArea from './ControlArea'
import LyricLine from './LyricLine'
import Scroller from '@/components/Scroller/Scroller'
import { Image, Slider, Icon } from 'vant'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { SET_FULLPAGE, SET_CURRENT_PLAY_INDEX, SET_PLAYING } from '@/store/module/player'
import { transDuration, getRandom } from '@/utils'
import { getLyric } from '@/service/base'

const LYRIC_LINE_HEIGHT = 25

export default {
  components: {
    VantImage: Image,
    Slider,
    Icon,
    Scroller,
    ControlArea,
    LyricLine
  },

  data () {
    return {
      currentPlayTime: 0,

      lockProgress: false,
      progress: 0,

      songReady: false,
      songUrl: '',

      lyric: undefined,
      lyricActiveLine: -1
    }
  },


  computed: {
    ...mapGetters('player', [
      'playing',
      'playListLength',
      'currentPlayIndex',
      'currentPlaySong',
      'currentPlayMode'
    ]),

    currentDuration () {
      return transDuration(Math.floor(this.currentPlayTime))
    },

    totalDuration () {
      return transDuration(this.currentPlaySong.interval || 0)
    },

    scrollerHeight () {
      return this.$refs.scroller
        ? this.$refs.scroller.$el.offsetHeight
        : -1
    },

    scollerOffetTop () {
      return this.$refs.scroller
        ? this.$refs.scroller.$el.offsetTop
        : -1
    },

    midLyricLine () {
      if (this.scrollerHeight === -1) return 100
      return Math.floor((this.scrollerHeight / 2) / 25)
    }
  },

  provide () {
    const _this = this
    return {
      next: _this.next,
      prev: _this.prev
    }
  },

  watch: {
    // 监测歌曲变化
    async currentPlaySong (newSong, prevSong) {
      if (newSong.songMid === prevSong.songMid) return

      this.addHistorySong(newSong)
      this.SET_PLAYING(false)
      this.resetState()

      // 请求歌曲URL
      this.getSongUrl(newSong.songMid).then(url => {
        this.songUrl = url
        this.SET_PLAYING(true)
      }).catch(err => feedback._errAlert(err))

      // 请求歌曲歌词
      this.getSongLyric(newSong.songMid).then(res => {
        this.lyric = new Lyric(res, this.handleLyric)
        this.lyric.seek(this.$refs.audio.currentTime * 1000 || 0)
        this.lyric.play()
      }).catch(err => feedback._errAlert(err))
    },

    // 监测播放状态
    playing (status) {
      this.$nextTick(() => {
        if (status) {
          if (!this.songUrl) {
            setTimeout(() => this.SET_PLAYING(false))
          } else {
            this.$refs.audio.play && this.$refs.audio.play()
            this.lyric && this.lyric.play()
          }
        } else {
          this.$refs.audio.pause()
          this.lyric && this.lyric.stop()
        }
      })
    }
  },

  mounted () {
    this.fixAudioInMobile()
  },

  methods: {
    ...mapMutations('player', [
      SET_PLAYING,
      SET_FULLPAGE, 
      SET_CURRENT_PLAY_INDEX
    ]),

    ...mapActions('player', [
      'getSongUrl', 
      'getSongLyric',
      'addHistorySong'
    ]),

    fixAudioInMobile () {
      const $body = document.body
      const handler = e => {
        this.$nextTick(() => {
          e.stopPropagation()
          this.$refs.audio && this.$refs.audio.load()
          $body.removeEventListener('touchstart', handler)
        })
      }

      $body.addEventListener('touchstart', handler)
    },

    changeSong (rule) {
      const {
        currentPlayMode,
        currentPlayIndex,
        playListLength
      } = this

      if (currentPlayMode === 'normal') {
        this.SET_CURRENT_PLAY_INDEX(rule(currentPlayIndex, playListLength))
      } else if (currentPlayMode === 'random') {
        const nextIndex = getRandom(this.playListLength, this.currentPlayIndex)
        this.SET_CURRENT_PLAY_INDEX(nextIndex)
      } else if (currentPlayMode === 'loop') {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        this.lyric && this.lyric.seek(0)
      }
    },

    // 上一首
    prev () {
      this.changeSong((currentPlayIndex, length) => {
        return (currentPlayIndex + length - 1) % length
      })
    },

    // 下一首
    next () {
      this.changeSong((currentPlayIndex, length) => {
        return (currentPlayIndex + 1) % length
      })
    },

    // 拉动进度条
    handleDragSliderEnd: ure.debounce(function () {
      this.lockProgress = false
      this.currentPlayTime = this.currentPlaySong.interval * (this.progress / 100)
      this.$refs.audio.currentTime = this.currentPlayTime
      this.lyric.seek(this.currentPlayTime * 1000)
    }, 100),

    // 实时更新播放进度
    handleAudioTime (e) {
      this.currentPlayTime = e.target.currentTime
      if (!this.lockProgress) {
        this.progress = 100 * this.currentPlayTime / this.currentPlaySong.interval
      }
    },

    handleLyric ({ lineNum }) {
      const scroller = this.$refs.scroller.$el
      if (lineNum > this.midLyricLine) {
        const target = scroller.childNodes[lineNum - this.midLyricLine]
        const offset = target.offsetTop - this.scollerOffetTop
        scroller.scrollTo({
          top: offset,
          behavior: 'smooth'
        })
      } else {
        scroller.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
      this.lyricActiveLine = lineNum
    },

    resetState () {
      // 歌曲状态归零
      this.songReady = false
      this.progress = 0
      this.songUrl = ''
      this.currentPlayTime = 0

      // 重置歌词
      this.lyric && this.lyric.stop()
      this.lyric = null

      // 停止音频
      this.$refs.audio.pause()
      this.$refs.audio.currentTime = 0

      // 歌词面板
      this.$refs.scroller.$el.scrollTo(0, 0)
    }
  },
}
</script>

<template>
  <div class="player" @touch.prevent="() => {}">
    <Icon name="shrink" color="#aaa" size="30px" @click="SET_FULLPAGE(false)"></Icon>

    <h2>{{ currentPlaySong.songName }}</h2>
    <h3 class="van-ellipsis">{{ currentPlaySong.singer }}</h3>

    <div class="bg-wrapper">
      <img :src="currentPlaySong.pic">
    </div>

    <div class="pic-wrapper">
      <vant-image 
        :src="currentPlaySong.pic"
        :class="playing ? 'play' : 'pause'"
        class="song-pic"
        width="200px"
        height="200px"
        round
      />
    </div>

    <Scroller class="lyric-wrapper" ref="scroller">
      <template v-if="lyric && lyric.lines">
        <lyric-line
          v-for="(item, index) in lyric.lines"
          ref="lyricWord"
          :key="index"
          :content="item.txt"
          :active="lyricActiveLine === index"
        /> 
      </template>
    </Scroller>

    <div class="progress-wrapper">
      <span>{{ currentDuration }}</span>
      <slider
        v-model="progress" 
        class="slider" 
        active-color="#fff" inactive-color="#aaa"
        @input="handleDragSliderEnd"
        @drag-start="lockProgress = true"
        @drag-end="handleDragSliderEnd"
      />
      <span>{{ totalDuration }}</span>
    </div>

    <control-area />

    <audio 
      ref="audio"
      :src="songUrl"
      @canplay="songReady = true"
      @timeupdate="handleAudioTime"
      @ended="next"
    ></audio>
  </div>
</template>

<style lang="scss" scoped>
@import './player.scss';
</style>