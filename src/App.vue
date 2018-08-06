<template>
  <div id="app">
    <home-header></home-header>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import homeHeader from 'components/homeHeader/homeHeader'
import tabBar from 'components/tab-bar/tab-bar'

export default {
  components: {
    homeHeader,
    tabBar
  }
}
</script>

<style lang="scss">
  @import "common/scss/index.scss";
  #app{
    width: 100%;
    max-width: 1080px;
    margin: 0 auto;
  }
</style>
