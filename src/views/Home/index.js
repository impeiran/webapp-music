import ure from 'ure'
import Swiper from './Swiper'
import SongSheets from './SongSheets'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',

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

  data () {
    return {

    }
  },

  mounted () {
  },

  render() {
    return (
      <div class='home-page'>
        <Swiper title={this.bannerTitle} value={this.banner} />
        
        {
          this.songSheets.slice(0, -1).map(sheet => {
            return <SongSheets value={sheet} />
          })
        }
      </div>
    )
  }
} 