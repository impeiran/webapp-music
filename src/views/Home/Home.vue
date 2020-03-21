<script>
import ure from 'ure'
import Swiper from './Swiper/Swiper'
import SongSheets from './SongSheets/SongSheets'
import { getOffcialSongSheets } from '@/service/home'
import feedback from '@/utils/feedback'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',

  components: {
    Swiper,
    SongSheets
  },

  data () {
    return {
      songSheetsList: []
    }
  },

  computed: {
    ...mapGetters(['songSheets']),

    bannerTitle () {
      const len = this.songSheets.length
      return ure.getValue(this.songSheets[len - 1], 'title_template') || ''
    },

    banner () {
      const len = this.songSheets.length
      return len
        ? ure.getValue(this.songSheets[len - 1], 'v_niche.0.v_card') || []
        : []
    }
  },

  mounted () {
    getOffcialSongSheets().then(res => {
      this.songSheetsList = res
    }).catch(feedback._errAlert)
  },

  methods: {
    visitSongSheet (id) {
      this.$router.push(`/song_sheet/${id}`)
    }
  }
} 
</script>

<template>
  <section class="page-home">
    <Swiper :title="this.bannerTitle" :value="this.banner" />
    <song-sheets 
      headline="官方歌单" 
      :value="songSheetsList"
      @visit="visitSongSheet"
    />
  </section>
</template>