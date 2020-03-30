<script>
import { Circle, Image } from 'vant'
import { mapGetters } from 'vuex'

export default {
  components: {
    VantCircle: Circle, VantImage: Image
  },

  props: {
    playing: { type: Boolean, default: false },
    progress: { type: Number, default: 0 },
    pic: { type: String, default: '' }
  }
}
</script>

<template>
  <div class="mini-player">
    <vant-circle :value="progress" size="50" :stroke-width="80">
      <vant-image
        class="song-pic"
        :class="playing ? 'play' : 'pause'"
        :src="pic"
        width="45"
        height="45"
        round
      />
    </vant-circle>
  </div>
  
</template>

<style lang="scss" scoped>
.mini-player {
  position: fixed;
  right: 5%;
  bottom: 20%;
  padding: 3px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 0 10px #aaa;
}
/deep/ .van-circle {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
