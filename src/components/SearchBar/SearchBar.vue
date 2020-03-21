<script>
import { Search } from 'vant'

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
  }
}
</script>

<template>
  <div class="search-bar">
    <Search 
      v-model="this.query"
      placeholder="请输入关键字"
      shape="round"
      readonly
      @click="this.goSearch"
    />
  </div>
</template>

<style lang="scss" scoped>
.search-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  box-shadow: 3px 3px 8px rgba($color: #000000, $alpha: 0.1);
  z-index: 1000;
}
</style>
