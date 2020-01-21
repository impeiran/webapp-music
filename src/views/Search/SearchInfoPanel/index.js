import { isEmpty } from 'lodash'
import { Popup, Divider, Button } from 'vant'
import { mapGetters } from 'vuex'

import './style.scss'

export default {
  components: {
    Popup, Divider, Button
  },

  computed: {
    ...mapGetters(['hotKeys'])
  },
  
  render() {
    const { hotKeys, historySearch } = this

    return (
      <div class='search-info-panel'>
        {
          !isEmpty(historySearch) && (
            <template>
              <Divider content-position='left'>历史搜索</Divider>
              <div class='tag-container'>
              {
                historySearch.map(item => {
                  return (
                    <Button size='small' class='tag-hot-key'>{ item }</Button>
                  )
                })
              }
              </div>
            </template>
          )
        }

        <Divider content-position='left'>大家都在搜</Divider>
        <div class='tag-container'>
        {
          !isEmpty(hotKeys) && hotKeys.map(item => {
            return (
              <Button size='small' class='tag-hot-key'>{ item.title }</Button>
            )
          })
        }
        </div>
      </div>
    )
  }
}