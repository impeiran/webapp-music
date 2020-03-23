<script>
import { Sidebar, SidebarItem, List, Cell, DropdownMenu, DropdownItem } from 'vant'
import { getSingerTags, getSingerList } from '@/service/singer'
import createPagination from '@/utils/createPagination'

const paginationMixin = createPagination({
  initialPageSize: 80,

  complete: (res, page, pageSize) => {
    return res.singerList.length < pageSize
  }
})

export default {
  name: 'singerList',

  components: { Sidebar, SidebarItem, List, Cell, DropdownMenu, DropdownItem },

  mixins: [paginationMixin],

  data () {
    return {
      tagList: {},
      option: {
        index: -100,
        area: -100,
        genre: -100
      },

      sideBarTitle: '',

      singerList: []
    }
  },

  computed: {
    indexList () {
      return this.tagList['index'] || []
    },

    areaList () {
      return (this.tagList['area'] || []).map(item => {
        return {
          text: item.name,
          value: item.id
        }
      })
    },

    genreList () {
      return (this.tagList['genre'] || []).map(item => {
        return {
          text: item.name,
          value: item.id
        }
      })
    }
  },

  mounted () {
    this.initData()
  },

  methods: {
    initData () {
      getSingerTags().then(res => {
        this.tagList = res || {}
        this.$nextTick(() => {
          this.paginationInfoLoad()
        })
      })
    },

    changeSideBar (index) {
      this.option.index = this.indexList[index].id
      this.reload()
    },

    changeArea (id) {
      this.option.area = id
      this.reload()
    },

    changeGenre (id) {
      this.option.genre = id
      this.reload()
    },

    reload () {
      this.singerList = []
      this.paginationInfoReset()
      this.paginationInfoLoad()
    },

    paginationInfoAction (page) {
      return getSingerList({
        ...this.option,
        cur_page: page
      })
    },

    paginationInfoResult (res) {
      this.total = res.total
      this.singerList = this.singerList.concat(res.singerList)
    }
  }
}
</script>

<template>
  <section class='singer-list-page'>
    <sidebar 
      v-model="sideBarTitle"
      class="van-hairline--right"
      @change="changeSideBar"
    >
      <sidebar-item 
        v-for="item in indexList"
        :key="item.name"
        :title="item.name"
      />
    </sidebar>

    <div class='content-container'>
      <!-- 筛选框 -->
      <dropdown-menu class='filter-menu'>
        <dropdown-item 
          v-model="option.area" 
          :options="areaList"
          @change="changeArea"
        />
        <dropdown-item 
          v-model="option.genre" 
          :options="genreList"
          @change="changeGenre"
        />
      </dropdown-menu>

      <!-- 内容区 - 滚动条项 -->
      <div class="content" v-if="singerList.length">
        <list
          v-model="paginationInfo.loading"
          :finished="paginationInfo.completed"
          @load="paginationInfoLoad"
        >
          <cell 
            v-for="item in singerList"
            :key="item.singer_id"
            :title="item.singer_name"
            :to="{
              name: 'singer',
              params: { mid: item.singer_mid },
              query: { name: item.singer_name }
            }"
            is-link
          />
        </list>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
@import '@/styles/mixin.scss';

.singer-list-page {
  position: relative;
  padding-left: 70px;

  .van-sidebar {
    position: fixed;
    left: 0;
    height: calc(100vh - 50px);
    width: 70px;
    overflow: auto;
    @include smoothScroll;

    .van-sidebar-item {
      padding: 15px 10px;
      text-align: center;
      background: #fff;
      transition: all .4s;
    }

    .van-sidebar-item--select {
      border-color: $themeBlue;
    }
  }

  .content-container {
    position: relative;

    .filter-menu {
      position: fixed;
      top: 0;
      width: calc(100vw - 70px);
      z-index: 10;
      overflow: hidden;
    }

    .content {
      padding-top: 50px;
    }
  }
}
</style>