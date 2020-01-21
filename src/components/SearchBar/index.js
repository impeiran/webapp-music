import { Search } from 'vant'

import './index.scss'

export default {
  components: {
    Search
  },

  data () {
    return {
      query: ''
    }
  },

  methods: {
    goSearch () {
      this.$router.push({ name: 'search' })
    }
  },

  render () {
    return (
      <div class='search-bar'>
        <Search 
          vModel={this.query}
          onClick={this.goSearch}
          placeholder='请输入关键字'
          shape='round'
          readonly
        />
      
      </div>
    )
  }
}