<template>
  <albumDetail :data="hot"></albumDetail>
</template>

<script>
import albumDetail from 'components/albumDetail/albumDetail'
import {getHotAlbum} from 'api/index'
import Hot from 'common/js/hot'

export default {
  components: {
    albumDetail
  },
  data () {
    return {
      hot: {}
    }
  },
  mounted () {
    this._getHotAlbum()
  },
  methods: {
    _getHotAlbum () {
      let tid = parseInt(this.$route.query.id)
      getHotAlbum(tid).then(res => {
        this.hot = new Hot(res.cdlist[0])
        console.log(this.hot)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
