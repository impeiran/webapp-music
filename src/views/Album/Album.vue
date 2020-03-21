<script>
import feedback from '@/utils/feedback'
import ListSheet from '@/components/ListSheet/ListSheet'
import { getRank } from '@/service/rank'

export default {
  name: 'album',

  components: {
    ListSheet
  },

  data () {
    return {
      albumInfo: {}
    }
  },

  mounted () {
    this.id = this.$route.params.id || -1

    getRank(this.id).then(res => {
      this.albumInfo = res
    }).catch(() => feedback._errAlert('获取排行榜歌单信息失败！'))
  }
}
</script>

<template>
  <list-sheet v-bind="this.albumInfo"/>
</template>