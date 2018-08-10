<template>
  <div id="app">
    <main-header></main-header>
    <tab-bar></tab-bar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import mainHeader from 'components/mainHeader/mainHeader'
import tabBar from 'components/tab-bar/tab-bar'

export default {
  components: {
    mainHeader,
    tabBar
  }
}
</script>

<style lang="scss">
</style>
