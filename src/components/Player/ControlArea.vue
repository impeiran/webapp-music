<script>
import { SET_PLAYING, SET_CURRENT_PLAY_MODE } from '@/store/module/player'
import { Icon, ActionSheet } from 'vant'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    Icon, ActionSheet
  },

  inject: ['prev', 'next'],

  data () {
    return {
      showModeList: false
    }
  },

  computed: {
    ...mapGetters('player', [
      'playing',
      'currentPlayMode'
    ]),

    renderModeList () {
      const playModeList = [
        { name: '列表循环', value: 'normal' },
        { name: '单曲循环', value: 'loop' },
        { name: '随机播放', value: 'random' }
      ]

      return playModeList.map(item => {
        if (item.value === this.currentPlayMode) {
          item.color = 'rgba(25, 137, 250, 0.5)'
        }
        return item
      })
    }
  },

  methods: {
    ...mapMutations('player', [
      SET_PLAYING,
      SET_CURRENT_PLAY_MODE
    ]),

    selectPlayMode (action, index) {
      this.SET_CURRENT_PLAY_MODE(action.value)
      this.showModeList = false
    }
  }
}
</script>

<template>
  <div>
    <div class="control-wrapper">
      <Icon 
        name="exchange" 
        @click="showModeList = true"
      />
      <Icon 
        name="arrow-left"
        @click="prev"
      />
      <Icon 
        :name="playing ? 'pause-circle-o' : 'play-circle-o'"
        @click="SET_PLAYING(!playing)"
      />
      <Icon 
        name="arrow" 
        @click="next"
      />
      <Icon 
        name="bars" 
      />
    </div>

    <action-sheet 
      v-model="showModeList"
      :actions="renderModeList"
      cancel-text="取消"
      @select="selectPlayMode"
    />
  </div>
</template>

<style lang="scss" scoped>
.control-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 8% 20px;
  padding: 0 15px;
  font-size: 28px;
  color: #ccc;

  .van-icon:nth-child(3) {
    font-size: 44px;
  }
}
</style>
