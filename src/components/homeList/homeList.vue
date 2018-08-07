<template>
  <div class="hot-wrapper">
    <h2 class="hot-title">热门歌单推荐</h2>
    <ul>
      <li class="album-item" v-for="item in albumList" :key="item.id">
        <div class="album-pic">
          <img v-lazy="item.picUrl">
        </div>
        <div class="content">
          <h3 class="name">{{item.songListDesc}}</h3>
          <p class="author">{{item.songListAuthor}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    albumList: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';

.hot-title{
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: $font-size-medium;
  color: $themeColor;
}
.album-item{
  display: flex;
  height: 120px;
  padding: 0 16px 16px;
  box-sizing: border-box;
  align-items: center;
  .album-pic{
    flex: 0 0 80px;
    width: 80px;
    height: 80px;
    img{
      width: 100%;
    }
  }
  .content{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    height: 70px;
    line-height: 25px;
    margin-left: 10px;
    font-size: $font-size-medium;
    .name{
      width: 100%;
      height: 25px;
      margin-bottom: 10px;
      @include nowrap;
    }
    .author{
      width: 100%;
      height: 25px;
      color: #aaa;
      @include nowrap;
    }
  }
}
</style>
