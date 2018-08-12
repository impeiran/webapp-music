<template>
  <albumDetail></albumDetail>
</template>

<script>
import {getRankAlbum} from 'api/index.js'
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
          console.log(res)
          this.album = this._normalizeAlbum(res)
        }
      })
    },
    _normalizeAlbum (data) {
      let ret = {}
      let songFilter = []
      ret.name = data.topinfo.ListName
      ret.pic = data.topinfo.pic_album
      for (let val of data.songlist) {
        let obj = {}
        let singer = []
        obj.id = val.data.songid
        obj.mid = val.data.songmid
        obj.name = val.data.songname
        for (let i of val.data.singer) {
          singer.push(i.name)
        }
        obj.singer = singer.join(' / ')
        songFilter.push(obj)
      }
      ret.songlist = songFilter
      console.log(ret)
      return ret
    }
  },
  mounted () {
    this._getAlbumDetail()
  }
}
</script>

<style lang="scss" scoped>
</style>
