<script>
import { Image, Icon } from 'vant'

export default {
  components: {
    VantImage: Image,
    Icon
  },

  props: {
    headline: { type: String, default: '' },
    value: { type: Array, default: () => [] }
  },

  methods: {
    visit (id) {
      this.$emit('visit', id)
    }
  }
}
</script>

<template>
  <div class="page-home-songsheet">
    <h3>{{ headline }}</h3>
    <div class="sheet-card-wrapper">
      <div 
        v-for="item in value"
        :key="item.tid"
        class="sheet-card"
        @click="visit(item.tid)"
      >
        <div class="img-wrapper">
          <vant-image :src="item.pic" width="100%" height="100%" lazy-load />
        </div>
        <div class="play-count">
          <Icon name='play-circle-o' />
          {{ $_playCount(item.playNum) }}
        </div>
        <div class='title van-ellipsis'>{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

.page-home-songsheet {
  padding: 0 10px;

  .sheet-card-wrapper {
    display: flex;
    flex-wrap: wrap;

    .sheet-card {
      margin: 0 calc(3% + 6px) 15px 0;
      padding-bottom: 8px;
      width: 30%;
      font-size: 12px;
      border-radius: 10px;
      background: #fff;
      overflow: hidden;
      @include boxShadowBlack;

      &:nth-child(3n+3) {
        margin-right: 0;
      }

      .play-count, .title {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0 6px;
        // font-weight: bold;
      }
    }
  }
}
</style>