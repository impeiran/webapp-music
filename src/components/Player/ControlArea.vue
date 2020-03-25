<script>
import { Icon } from 'vant'
import { mapGetters, mapMutations } from 'vuex'
import { SET_PLAYING } from '@/store/module/player'

export default {
  components: {
    Icon
  },

  inject: ['prev', 'next'],

  computed: {
    ...mapGetters('player', [
      'playing'
    ])
  },

  methods: {
    ...mapMutations('player', [
      SET_PLAYING
    ])
  }
}
</script>

<template>
  <div>
    <div class="control-wrapper">
      <Icon name="exchange" />
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
      <Icon name="bars" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.control-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 8% 40px;
  padding: 0 15px;
  font-size: 28px;
  color: #ccc;

  .van-icon:nth-child(3) {
    font-size: 44px;
  }
}
</style>
