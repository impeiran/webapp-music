import NavFooter from '@/components/NavFooter/NavFooter'
import SearchBar from '@/components/SearchBar/SearchBar'

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
    }
  },

  mounted() {
  },

  render () {
    return (
      <div class="app-container" style={ this.layoutStyle }>

        {/* search bar */}
        { !this.hideSearchBar && <SearchBar />}
        
        <keep-alive>
          <router-view></router-view>
        </keep-alive>

        {/* nav bar  */}
        { !this.hideNavBottom && <NavFooter />}
      </div>
    )
  }
}
