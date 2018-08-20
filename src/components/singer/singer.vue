<template>
  <albumDetail :data="singer"></albumDetail>
</template>

<script>
import albumDetail from 'components/albumDetail/albumDetail'
import {getSingerData} from 'api/index'
import Singer from 'common/js/singer'

export default {
  components: {
    albumDetail
  },
  data () {
    return {
      singer: {}
    }
  },
  created () {
    let mid = this.$route.query.mid
    getSingerData(mid).then(res => {
      if (!res.code) {
        this.singer = new Singer(res.data)
        // console.log(res.data)
        console.log(this.singer)
      }
    })
  }
}
</script>
