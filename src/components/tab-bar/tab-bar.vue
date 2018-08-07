<template>
  <ul class="tab">
    <router-link tag="li" class="tab-item" to="/home">
      <span>首页</span>
    </router-link>
    <router-link tag="li" class="tab-item" to="/rank">
      <span>排行</span>
    </router-link>
    <router-link tag="li" class="tab-item" to="/search">
      <span>搜索</span>
    </router-link>
  </ul>
</template>

<script>
export default{}
</script>

<style lang="scss" scoped>
  @import "common/scss/variable.scss";
  .tab{
    display: flex;
    width: 100%;
    height: 44px;
    line-height: 44px;
    font-size: $font-size-medium;
    .tab-item{
      flex: 1;
      text-align: center;
    color: #aaa;
      &.router-link-active{
        color: $themeColor;
        border-bottom: 2px $themeColor solid;
      }
    }
  }
</style>
