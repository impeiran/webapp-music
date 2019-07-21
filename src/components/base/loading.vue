<template>
  <div class="loading">
    <img src="./loading.gif" alt="">
    <p>{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '加载中'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'common/scss/variable.scss';

  .loading {
    width: 100%;
    text-align: center;
    img {
      width: 24px;
      height: 24px;
    }
    p {
      line-height: 20px;
      font-size: $font-size-small;
      color: #aaa;
    }
  }
</style>
