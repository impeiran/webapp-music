<template>
  <div class="album-song">
    <div class="num">
      {{index+1}}
    </div>
    <ul class="content">
      <li>{{data.name}}</li>
      <li>{{data.singer}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    },
    index: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'common/scss/variable.scss';
  @import 'common/scss/mixin.scss';
  .album-song{
    display: flex;
    align-items: center;
    width: 100%;
    height: 70px;
    box-sizing: border-box;
    .num{
      flex: 0 0 50px;
      height: 50px;
      line-height: 50px;
      font-size: $font-size-large;
      text-align: center;
      color: $themeColor;
    }
    .content{
      flex: 1;
      margin-left: 10px;
      overflow: hidden;
      li{
        line-height: 18px;
        margin-bottom: 8px;
        font-size: $font-size-medium;
        @include nowrap;
      }
      li:last-child{
        color: #999;
      }
    }
  }
</style>
