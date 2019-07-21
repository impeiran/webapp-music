<template>
  <div class="hs-wrapper">
    <swiper :options="swiperOption" ref="mySwiper" v-if="slider.length">
      <swiper-slide v-for="item in slider" :key="item.id">
        <a :href="item.linkUrl">
          <img :src="item.picUrl" alt="">
        </a>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    slider: {
      type: Array,
      default: null
    }
  },

  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: {
          autoplay: true,
          delay: 1500,
          disableOnInteraction: false
        },
        loop: true
      }
    }
  },

  activated () {
    if (!this.$refs.mySwiper) return
    this.$nextTick(() => {
      this.$refs.mySwiper.swiper.autoplay.start()
    })
  },

  deactivated () {
    if (!this.$refs.mySwiper) return
    this.$nextTick(() => {
      this.$refs.mySwiper.swiper.autoplay.stop()
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/variable.scss';
.hs-wrapper /deep/ .swiper-pagination-bullet{
    background: #ccc;
}
.hs-wrapper /deep/ .swiper-pagination-bullet-active{
    background: $themeColor;
}
.hs-wrapper{
  width: 100%;
  height: 0;
  margin: 8px 0;
  padding-bottom: 40%;
  overflow: hidden;
  img{
    width: 100%;
  }
}
</style>
