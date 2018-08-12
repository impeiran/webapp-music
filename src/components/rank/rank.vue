<template>
  <div class="rank">
    <scroll class="rank-wrapper">
      <ul>
        <li class="rank-item" v-for="item in topList" :key="item.id" @click="selectAlbum(item.id)">
          <div class="rank-pic">
            <img v-lazy="item.picUrl" alt="">
          </div>
          <ul class="rank-content">
            <li class="rank-song" v-for="(innerItem,innerIndex) in item.songList" :key="innerIndex">
              <span>{{innerIndex + 1}}</span>
              <span>{{innerItem.songname}} - {{innerItem.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-wrapper" v-show="!topList">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import {getRankData} from 'api/index.js'
import scroll from 'components/base/scroll'
import loading from 'components/base/loading'

export default {
  components: {
    scroll,
    loading
  },
  data () {
    return {
      topList: []
    }
  },
  methods: {
    getRank () {
      getRankData().then(res => {
        if (!res.code) {
          this.topList = res.data.topList
        }
      })
    },
    selectAlbum (id) {
      this.$router.push({
        path: '/rank/detail',
        query: {
          id: id
        }
      })
    }
  },
  mounted () {
    this.getRank()
  }
}
</script>

<style lang="scss" scoped>
  @import 'common/scss/variable.scss';
  @import 'common/scss/mixin.scss';
  .rank{
    width: 100%;
    position: fixed;
    top: 96px;
    bottom: 0;
    .rank-wrapper{
      height: 100%;
      overflow: hidden;
      .rank-item{
        display: flex;
        width: 100%;
        height: 120px;
        margin: 0 20px;
        align-items: center;
        .rank-pic{
          flex: 0 0 100px;
          width: 100px;
          height: 100px;
          img{
            width: 100%;
          }
        }
        .rank-content{
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          height: 100px;
          margin-right: 40px;
          padding: 0 20px;
          box-sizing: border-box;
          background: #333;
          overflow: hidden;
          .rank-song{
            height: 26px;
            line-height: 26px;
            font-size: $font-size-medium;
            color: #aaa;
            @include nowrap;
          }
        }
      }
    }
  }
</style>
