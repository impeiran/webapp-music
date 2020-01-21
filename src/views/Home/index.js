import ure from 'ure'
import { mapGetters } from 'vuex'
import Swiper from './Swiper'

export default {
  name: 'Home',

  computed: {
    ...mapGetters(['songSheets']),

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
        <Swiper value={this.banner} />
      </div>
    )
  }
} 