<script>
import { Image, Row, Col } from 'vant'

export default {
  components: {
    VantImage: Image, 
    VantRow: Row, 
    VantCol: Col
  },

  props: {
    pic: { type: String, default: '' },
    name: { type: String, default: '' },
    songNum: { type: Number, default: 0 }
  }
}
</script>

<template>
  <vant-row type="flex" gutter="10" align="center">
    <vant-col span="4">
      <vant-image :src="pic" width="100%" height="100%" round />
    </vant-col>

    <vant-col span="8" tag="div" class="content">
      <span class="name">{{ name }}</span>
      <span>歌曲数：{{ songNum }}</span>
    </vant-col>
  </vant-row>
</template>

<style lang="scss" scoped>
.content {
  span {
    display: block;
    margin-bottom: 4px;
    color: #aaa;

    &.name {
      color: #333;
      font-weight: bold;
    }
  }
}
</style>
