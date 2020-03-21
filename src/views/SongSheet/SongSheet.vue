<script>
import feedback from '@/utils/feedback'
import ListSheet from '@/components/ListSheet/ListSheet'
import { getSongSheetInfo } from '@/service/song-sheet'

export default {
  name: 'songSheet',

  components: {
    ListSheet
  },

  data () {
    return {
      info: {}
    }
  },

  mounted () {
    this.id = this.$route.params.id || -1

    getSongSheetInfo(this.id).then(res => {
      this.info = res
    }).catch(() => feedback._errAlert('获取歌单信息失败！'))
  }
}
</script>

<template>
  <list-sheet v-bind="this.info"/>
</template>