<script>
import { Swipe, SwipeItem, Image } from 'vant'


export default {
  components: {
    Swipe, SwipeItem, VantImage: Image
  },

  props: {
    title: { type: String, default: '' },
    value: { type: Array, default: () => [] }
  },

  methods: {
    genImgStyle (url) {
      return {
        backgroundImage: `url(${url})`
      }
    },

    visit (data) {
      window.location.href = data.id
    }
  }
}
</script>

<template>
  <div class="page-home-swiper">
    <h3>{{ title }}</h3>

    <Swipe :width="250" :show-indicators="false" :autoplay="3000">
      <SwipeItem v-for="item in value" :key="item.id" @click="visit(item)">
        <div class="home-swipe-item box-shadow-border">
          <div class="banner-image" :style="genImgStyle(item.cover)">
            <div class="pic-name">
              <vant-image height="30" width="30" :src="item.miscellany.icon" round />
              <span>{{ item.title }}</span>
            </div>
          </div>
          <div class="subtitle">{{ item.subtitle }}</div>
        </div>
      </SwipeItem>
    </Swipe>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

.page-home-swiper {
  h3 {
    margin: 10px;
  }

  .home-swipe-item {
    margin: 8px;
    border-radius: 10px;
    background: #fff;
    overflow: hidden;
  
    .banner-image {
      position: relative;
      padding-bottom: 56%;
      width: 100%;
      height: 0;
      box-sizing: content-box;
      background-size: cover;
      overflow: hidden;
  
      .pic-name {
        display: flex;
        align-items: center;
        position: absolute;
        left: 3%;
        bottom: 3%;
        color: #fff;
  
        span {
          display: inline-block;
          margin: 0 15px;
          font-weight: bold;
        }
      }
    }
  
    .subtitle {
      margin: 4px 10px;
      min-height: 40px;
      font-weight: bold;
    }
  }
}
</style>