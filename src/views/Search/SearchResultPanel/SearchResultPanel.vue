<script>
import ure from 'ure'
import SongList from '@/components/SongList/NormalList'
import SingerResult from './SingerResult'
import { getSingerAvatar } from '@/service/base'
import { Popup, List, Loading } from 'vant'

export default {
  components: {
    SongList,
    SingerResult,
    Popup,
    Loading,
    List
  },

  props: {
    height: { type: String, default: 'calc(100vh - 140px)' },
    list: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
    finished: { type: Boolean, default: false },
    singerInfo: { type: Object, default: () => {} }
  },

  computed: {
    hasSingerInfo () {
      return !ure.isEmpty(this.singerInfo) &&
        Object.values(this.singerInfo).some(item => {
          return !!item
        })
    },

    singerPic () {
      return this.hasSingerInfo
        ? getSingerAvatar(this.singerInfo.singerMid)
        : ''   
    }
  },

  methods: {
    updateLoading (value) {
      this.$emit('update:loading', value)
    }
  }
}
</script>

<template>
  <Popup
    :value="$attrs.value"
    class="popup-result box-shadow-border"
    position="bottom"
    round
    @input="$listeners.input"
  >
    <div :style="{height: height}" class="list-container">
      <List
        v-if="list.length"
        :value="$attrs.loading"
        :loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @input="updateLoading"
        @load="$listeners.load"
      >
        <singer-result 
          v-if="hasSingerInfo"
          :pic="singerPic"
          :name="singerInfo.singerName"
          :song-num="singerInfo.songNum"
        />
        <song-list :list="list" useIcon></song-list>
      </List>

      <Loading 
        v-else
        color="#1989fa" 
        size="36px" 
        vertical
      >加载中...</Loading>
    </div>
  </Popup>
</template>

<style lang="scss" scoped>
.popup-result {
  padding: 20px 10px;
}
</style>
