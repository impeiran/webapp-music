import SearchInfoPanel from '@/views/Search/SearchInfoPanel'
import { Field, CellGroup } from 'vant'

export default {
  components: {
    SearchInfoPanel, Field, CellGroup
  },

  data () {
    return {
      keyword: '',

      showSearchResult: false
    }
  },

  methods: {
    search () {

    }
  },

  mounted () {
    this.$refs.searchField.focus()
  },

  render () {
    return (
      <section class='search-page'>
        <CellGroup>
          <Field 
            vModel={this.keyword}
            ref='searchField'
            label='搜索'
            label-width='3em'
            left-icon='search'  
            placeholder='请输入关键字'
          />
        </CellGroup>

        <SearchInfoPanel />
      </section>
    )
  }
}