<script>
import SongList from '@/components/SongList/NormalList'
import { SET_PLAYING, SET_CURRENT_PLAY_MODE } from '@/store/module/player'
import { Icon, Dialog, ActionSheet } from 'vant'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    Icon, ActionSheet, SongList
  },

  inject: ['prev', 'next'],

  data () {
    return {
      showModeList: false,
      showHistoryList: false
    }
  },

  computed: {
    ...mapGetters('player', [
      'playing',
      'historyPlayList',
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

    ...mapActions('player', [
      'playSong',
      'removeHistorySong',
      'clearHistorySong'
    ]),

    selectPlayMode (action, index) {
      this.SET_CURRENT_PLAY_MODE(action.value)
      this.showModeList = false
    },

    clearHistory () {
      this.historyPlayList.length && 
      Dialog.confirm({
        message: '确定要清除全部历史播放吗'
      }).then(() => {
        this.clearHistorySong()
      }).catch(() => {});
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
        @click="showHistoryList = true"
      />
    </div>

    <action-sheet 
      v-model="showModeList"
      :actions="renderModeList"
      cancel-text="取消"
      @select="selectPlayMode"
    />
    
    <action-sheet 
      v-model="showHistoryList"
      title="历史播放"
      cancel-text="清空"
      close-icon=""
      @cancel="clearHistory"
    >
      <div class="history-content">
        <song-list 
          :list="historyPlayList" 
          useIcon showRightIcon
          @select="playSong"
          @click-right-icon="removeHistorySong"
        />
        <div v-if="!historyPlayList.length" class="tip-word">暂无历史</div>
      </div>
    </action-sheet>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
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

.history-content {
  height: 40vh;
  overflow: auto;
  @include smoothScroll;

  .tip-word {
    margin: 10px 0;
    text-align: center;
    color: #aaa;
  }
}
</style>
