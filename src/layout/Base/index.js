import NavFooter from '@/components/NavFooter/NavFooter'
import SearchBar from '@/components/SearchBar/SearchBar'
import { mapState } from 'vuex'

export default {
  components: {
    NavFooter,
    SearchBar
  },

  data () {
    return {
      hideSearchBar: true,
      hideNavBottom: false
    }
  },

  computed: {
    ...mapState(['cacheRoutes']),

    layoutStyle () {
      const defaultStyle = {
        minHeight: '100vh'
      }

      return Object.assign(defaultStyle, {
        paddingTop: this.hideSearchBar ? 0 : '54px',
        paddingBottom: this.hideNavBottom ? 0 : '50px'
      })
    }
  },

  watch: {
    $route: {
      handler (newRoute) {
        this.handleControlMeta(newRoute.meta)
      },
      immediate: true
    }
  },

  methods: {
    handleControlMeta (meta) {
      this.hideSearchBar = meta && meta.hasOwnProperty('hideSearchBar')
        ? meta.hideSearchBar
        : false
      
      this.hideNavBottom = meta && meta.hasOwnProperty('hideNavBottom')
        ? meta.hideNavBottom
        : false
    },
  },

  render () {
    return (
      <div class="app-container" style={ this.layoutStyle }>

        {/* search bar */}
        { !this.hideSearchBar && <SearchBar />}
        
        <keep-alive include={this.cacheRoutes}>
          <router-view></router-view>
        </keep-alive>

        {/* nav bar  */}
        { !this.hideNavBottom && <NavFooter />}
      </div>
    )
  }
}
