<template>
  <albumDetail :data="album"></albumDetail>
</template>

<script>
import {getRankAlbum} from 'api/index.js'
import Album from 'common/js/album.js'
import albumDetail from 'components/albumDetail/albumDetail'

export default {
  components: {
    albumDetail
  },
  data () {
    return {
      album: {}
    }
  },
  methods: {
    _getAlbumDetail () {
      let id = this.$route.query.id
      getRankAlbum(id).then(res => {
        if (!res.code) {
          // console.log(res)
          this.album = new Album(res)
          console.log(this.album)
        }
      })
    }
  },
  mounted () {
    this._getAlbumDetail()
  }
}
</script>

<style lang="scss" scoped>
</style>
