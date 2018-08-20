<template>
  <div>
    <scroll :data=songsResult
            ref="myscroll"
            :pullup="pullup"
            :beforeScroll="beforeScroll"
            @scrollToEnd="searchMore"
            @beforeScroll="listScroll">
      <ul class="result-list">
        <li v-if="singerResult.type"
            @click="selectSinger(singerResult)">
          <img :src="singerResult.pic">
          <div class="content">
            <h1>{{singerResult.singername}}</h1>
            <span>单曲:{{singerResult.songnum}}</span>
          </div>
        </li>
        <li v-for="(item, index) in songsResult"
            :key="item.id"
            @click="selectSong(item, index)">
          <i class="iconfont icon-music"></i>
          <div class="content">
            <span v-html="item.name"></span>
            <span v-html="item.singer"></span>
          </div>
        </li>
        <loading v-show="hasMore"></loading>
      </ul>
      <div class="no-result" v-show="!hasMore && !songsResult.length">暂无搜索结果</div>
    </scroll>
  </div>
</template>

<script>
import {search} from 'api/index'
import scroll from 'components/base/scroll'
import {debounce} from 'common/js/util'
import Result from 'common/js/result'
import loading from 'components/base/loading'
import {mapGetters, mapActions} from 'vuex'

const perpage = 20
const withSinger = 1

export default {
  components: {
    scroll,
    loading
  },
  data () {
    return {
      page: 1,
      totalResult: {},
      singerResult: {},
      songsResult: [],
      hasMore: true,
      pullup: true,
      beforeScroll: true
    }
  },
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  computed: {
    singerPic () {
      if (this.singerResult.singermid) {
        return `https://y.gtimg.cn/music/photo_new/T001R68x68M000${this.singerResult.singermid}.jpg?max_age=2592000`
      } else if (this.singerResult.albummid) {
        return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.singerResult.albummid}.jpg?max_age=2592000`
      } else {
        return ''
      }
    },
    ...mapGetters([
      'playlist'
    ])
  },
  methods: {
    refresh () {
      this.$refs.myscroll.refresh()
    },
    listScroll () {
      this.$emit('listScroll')
    },
    _search (newQuery) {
      if (!newQuery) {
        return
      }
      this.page = 1
      this.hasMore = true
      this.$refs.myscroll.scrollTo(0, 0)
      search(newQuery, this.page, withSinger, perpage).then(res => {
        if (!res.code) {
          this._normalizeResult(res.data)
          this._checkMore(res.data.song)
          // console.log(this.singerResult)
          // console.log(this.songsResult)
        }
      })
    },
    searchMore () {
      if (!this.hasMore) {
        return
      }
      this.page++
      search(this.query, this.page, withSinger, perpage).then(res => {
        if (!res.code) {
          let newResult = new Result(res.data)
          this.songsResult = this.songsResult.concat(newResult.songlist)
          this._checkMore(res.data.song)
          // console.log(this.singerResult)
        }
      })
    },
    _normalizeResult (data) {
      if (data.zhida.type) {
        this.singerResult = data.zhida
        this.singerResult.pic = this.singerPic
      } else {
        this.singerResult = {}
      }
      this.page = data.song.curpage
      this.totalResult = new Result(data)
      this.songsResult = this.totalResult.songlist
    },
    _checkMore (song) {
      if (!song.list.length || (song.curpage * perpage + song.curnum) > song.totalnum) {
        this.hasMore = false
      }
    },
    selectSong (item, index) {
      this.selectPlay({
        list: this.songsResult,
        index
      })
    },
    selectSinger (item) {
      this.$router.push({
        path: '/singer',
        query: {
          mid: item.singermid
        }
      })
    },
    ...mapActions([
      'selectPlay'
    ])
  },
  created () {
    this.$watch('query', debounce(newQuery => {
      this._search(newQuery)
    }, 300))
  }
}
</script>

<style lang="scss" scoped>
  @import 'common/scss/variable.scss';
  @import 'common/scss/mixin.scss';
  .result-list{
    width: 100%;
    overflow: hidden;
    li{
      display: flex;
      align-items: center;
      height: 40px;
      margin-bottom: 10px;
      padding: 0 10px;
      box-sizing: border-box;
      &:first-child{
        img{
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .content{
          margin-left: 16px;
          h1{
            margin-bottom: 8px;
            font-size: $font-size-medium;
          }
        }
      }
      .iconfont{
        flex: 0 0 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 28px;
        color: $themeColor;
      }
      .content{
        flex: 1;
        margin-left: 18px;
        overflow: hidden;
        span{
          display: block;
          font-size: $font-size-medium;
          @include nowrap;
          &:first-child{
            margin-bottom: 8px;
          }
          &:last-child{
            color: #888;
            font-size: $font-size-small;
          }
        }
      }
    }
  }
  .no-result{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    color: #aaa;
  }
</style>
