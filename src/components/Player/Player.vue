<script>
import ControlArea from './ControlArea'
import { Image, Slider, Icon } from 'vant'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { SET_FULLPAGE, SET_CURRENT_PLAY_INDEX, SET_PLAYING } from '@/store/module/player'
import { transDuration, getRandom } from '@/utils'
import feedback from '@/utils/feedback'
import ure from 'ure'

export default {
  components: {
    VantImage: Image,
    Slider,
    Icon,
    ControlArea
  },

  data () {
    return {
      currentPlayTime: 0,

      lockProgress: false,
      progress: 0,

      songReady: false,
      songUrl: ''
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
    async currentPlaySong (newSong) {
      this.SET_PLAYING(false)
      this.resetState()

      this.getSongUrl(newSong.songMid).then(url => {
        this.songUrl = url
        this.SET_PLAYING(true)
      }).catch(err => feedback._errAlert(err))
    },

    playing (status) {
      this.$nextTick(() => {
        if (status) {
          if (!this.songUrl) {
            setTimeout(() => this.SET_PLAYING(false))
          } else {
            this.$refs.audio.play()
          }
        } else {
          this.$refs.audio.pause()
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

    ...mapActions('player', ['getSongUrl']),

    fixAudioInMobile () {
      const $body = document.body
      const handler = e => {
        this.$nextTick(() => {
          e.stopPropagation()
          this.$refs.audio.load()
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
      }
    },

    prev () {
      this.changeSong((currentPlayIndex, length) => {
        return (currentPlayIndex + length - 1) % length
      })
    },

    next () {
      this.changeSong((currentPlayIndex, length) => {
        return (currentPlayIndex + 1) % length
      })
    },

    handleDragSliderEnd: ure.debounce(function () {
      this.lockProgress = false
      this.currentPlayTime = this.currentPlaySong.interval * (this.progress / 100)
      this.$refs.audio.currentTime = this.currentPlayTime
    }, 100),

    handleAudioTime (e) {
      this.currentPlayTime = e.target.currentTime
      if (!this.lockProgress) {
        this.progress = 100 * this.currentPlayTime / this.currentPlaySong.interval
      }
    },

    resetState () {
      this.songReady = false
      this.progress = 0
      this.songUrl = ''
      this.currentPlayTime = 0
      this.$refs.audio.pause()
      this.$refs.audio.currentTime = 0
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
        width="250px"
        height="250px"
        round
      />
    </div>

    <div class="lyric-wrapper">

    </div>

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
      @timeupdate="handleAudioTime"
      @ended="next"
    ></audio>
  </div>
</template>

<style lang="scss" scoped>
@import './player.scss';
</style>