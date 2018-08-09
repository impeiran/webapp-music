<template>
  <div class="rank">
    <scroll class="rank-wrapper">
      <ul>
        <li class="rank-item" v-for="item in topList" :key="item.id">
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
      <div class="loading-wrapper">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from 'components/base/scroll'
import axios from 'axios'
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
      axios.get('api/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1533667513091')
        .then((res) => {
          if (!res.data.code) {
            this.topList = res.data.data.topList
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
