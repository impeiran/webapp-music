<script>
import ListSheet from '@/components/ListSheet/ListSheet'
import { getSingerAvatar } from '@/service/base'
import { getSingerSongList } from '@/service/singer'
import createPagination from '@/utils/createPagination'
import { List } from 'vant'

const paginationMixin = createPagination({
  initialPageSize: 50,

  complete: (res, page, pageSize) => {
    return res.list.length < pageSize
  }
})

export default {
  components: {
    ListSheet,
    List
  },

  mixins: [paginationMixin],

  data () {
    return {
      mid: '',
      name: '',
      pic: '',

      total: 0,
      list: []
    }
  },

  mounted () {
    const { mid } = this.$route.params
    const { name } = this.$route.query

    this.mid = mid
    this.name = name
    this.pic = getSingerAvatar(this.mid)

    // this.paginationInfoLoad()
  },

  methods: {
    paginationInfoAction (page) {
      return getSingerSongList(this.mid, page)
    },

    paginationInfoResult (res) {
      this.total = res.total
      this.list = this.list.concat(res.list || [])
    }
  }
}
</script>

<template>
  <section class="page-singer">
    <list
      v-model="paginationInfo.loading"
      :finished="paginationInfo.completed"
      @load="paginationInfoLoad"
    >
      <list-sheet 
        :name="name"
        :pic="pic"
        :total="total"
        :list="list"
      />
    </list>
  </section>
</template>