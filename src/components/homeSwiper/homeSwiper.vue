<template>
  <div class="hs-wrapper">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="item in slider" :key="item.id" ref="mySwiper">
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
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        loop: {
          loop: true
        },
        autoplay: {
          autoplay: true,
          delay: 1500,
          disableOnInteraction: false
        }
      }
    }
  },
  props: {
    slider: {
      type: Array,
      default: null
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  activated () {
    this.swiper.autoplay.start()
  },
  deactivated () {
    this.swiper.autoplay.stop()
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
