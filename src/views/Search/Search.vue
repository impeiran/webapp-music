<script>
import ure from 'ure'
import SearchInfoPanel from './SearchInfoPanel/SearchInfoPanel'
import SearchResultPanel from './SearchResultPanel/SearchResultPanel'
import createPagination from '@/utils/createPagination'
import { searchSingerAndSong } from '@/service/search'
import { Field, CellGroup } from 'vant'
import { mapGetters } from 'vuex'

const paginationMixin = createPagination({
  initialPageSize: 30,

  complete: (res, page, pageSize) => {
    return res.list.length < pageSize
  }
})

export default {
  name: 'search',

  mixins: [paginationMixin],

  components: {
    SearchInfoPanel, SearchResultPanel, Field, CellGroup
  },

  data () {
    return {
      keyword: '',
      showCancel: false,
      showSearchResult: false,

      historySearch: [],

      result: [],
      showResult: false,

      singerInfo: {}
    }
  },

  computed: {
    ...mapGetters(['hotKeys']),
  },

  mounted () {
    this.$refs.searchField.focus()

    this.keyword = window.decodeURI(this.$route.query.kw || '')
    this.showCancel = Boolean(this.$route.params.showCancel)

    this.$nextTick(() => {
      this.keyword && this.search()
    })
  },

  methods: {
    search () {
      this.result = []
      this.paginationInfoReset()
      this.paginationInfoLoad()
      this.showResult = true

      this.replaceUrl({
        kw: window.encodeURI(this.keyword)
      })
    },

    handleInput: ure.debounce(function () {
      this.keyword && this.search()
    }, 400),

    handleFocus () {
      this.showResult = Boolean(
        this.result.length && this.keyword
      )
    },

    selectKeyword (kw) {
      this.keyword = kw
      this.search()
    },

    replaceUrl (info) {
      const preQuery = this.$route.query || {}
      if (info.kw !== preQuery.kw) {
        this.$router.replace({
          query: {
            ...preQuery,
            ...info
          }
        })
      }
    },

    paginationInfoAction (page, pageSize) {
      return searchSingerAndSong(this.keyword, page, pageSize)
    },

    paginationInfoResult (res) {
      this.result = this.result.concat(res.list)
      this.singerInfo = {
        singerName: res.singerName,
        singerMid: res.singerMid,
        songNum: res.songNum
      }
    }
  }
}
</script>

<template>
  <section class="page-search">
    <cell-group class="search-field">
      <Field 
        v-model="keyword"
        ref="searchField"
        label="搜索"
        label-width="3em"
        left-icon="search"
        placeholder="请输入关键字"
        autofocus clearable
        @input="handleInput"
        @focus="handleFocus"
      >
        <template v-if="showCancel" #button>
          <span @click="$router.back()">取消</span>
        </template>
      </Field>
    </cell-group>

    <search-info-panel 
      :history-search="historySearch"
      :hot-keys="hotKeys"
      @select="selectKeyword"
    />

    <search-result-panel
      v-model="showResult"
      :loading.sync="paginationInfo.loading"
      :finished="paginationInfo.completed"
      :list="result"
      :singer-info="singerInfo"
      @load="paginationInfoLoad"
    />
  </section>
</template>

<style lang="scss" scoped>
.page-search {
  position: relative;
  padding-top: 44px;

  .search-field {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
  }
}
</style>