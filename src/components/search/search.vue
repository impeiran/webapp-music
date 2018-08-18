<template>
  <div class="search">
    <div class="search-box-wrapper">
      <div class="search-box">
        <i class="iconfont icon-search"></i>
        <input type="text" v-model="text" :placeholder="placeHolder">
        <i v-show="text" @click="clearSearchText" class="iconfont icon-delete"></i>
      </div>
    </div>
    <div class="hotkey">
      <h1>热门搜索</h1>
      <ul>
        <li v-for="item in hotkey" :key="item.n">{{item.k}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getHotKey} from 'api/index'

export default {
  data () {
    return {
      placeHolder: '请输入要搜索的内容',
      text: '',
      hotkey: []
    }
  },
  methods: {
    clearSearchText () {
      this.text = ''
    },
    _getHotKey () {
      getHotKey().then(res => {
        if (!res.code) {
          this.hotkey = res.data.hotkey.slice(0, 10)
        }
      })
    }
  },
  created () {
    this._getHotKey()
  }
}
</script>

<style lang="scss" scoped>
  @import 'common/scss/variable.scss';
  @import 'common/scss/mixin.scss';
  .search-box-wrapper{
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    .search-box{
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
      padding: 0 6px;
      box-sizing: border-box;
      text-align: center;
      border-radius: 8px;
      background: #444;
      .iconfont{
        font-size: $font-size-large;
        color: #222;
        &.icon-delete{
          font-size: $font-size-large-x;
        }
      }
      input{
        flex: 1;
        width: 100%;
        margin: 0 8px;
        line-height: 24px;
        font-size: $font-size-medium;
        color: #aaa;
        background: #444;
        outline: none;
        &::placeholder{
          color: #888;
        }
      }
    }
  }
  .hotkey{
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    h1{
      margin: 10px 0;
      color: #aaa;
      font-size: $font-size-medium;
    }
    ul{
      width: 100%;
      &::after{
        display: block;
        content: '';
        clear: both;
      }
      li{
        float: left;
        margin: 6px;
        padding: 8px 14px;
        font-size: $font-size-medium;
        color: #888;
        background: #444;
        border-radius: 8px;
      }
    }
  }
</style>
