<script>
import { isEmpty } from 'lodash'
// import { Popup, Divider, Button } from 'vant'
import { Divider, Button } from 'vant'

export default {
  components: {
    Divider, Button
  },

  props: {
    historySearch: { type: Array },

    hotKeys: { type: Array }
  },

  computed: {
    hasHistorySearch () {
      return !isEmpty(this.historySearch)
    },

    hasHotKeys () {
      return !isEmpty(this.hotKeys)
    }
  },

  methods: {
    selectKey (name) {
      this.$emit('select', name)
    }
  }
}
</script>

<template>
  <div class="search-info-panel">
    <template v-if="hasHistorySearch">
      <Divider content-position="left">历史搜索</Divider>
      <div class="tag-container">
        <Button
          v-for="item in historySearch"
          :key="item"
          size="small" 
          class="tag-hot-key"
          @click="selectKey(item)"
        >{{ item }}</Button>
      </div>
    </template>

    <Divider content-position='left'>大家都在搜</Divider>

    <div class="tag-container">
      <Button
        v-for="item in hotKeys"
        :key="item.title"
        size="small" 
        class="tag-hot-key"
        @click="selectKey(item.title)"
      >{{ item.title }}</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-info-panel {
  .tag-container {
    padding: 0 15px;

    .tag-hot-key {
      margin: 4px;
    }
  }
}
</style>