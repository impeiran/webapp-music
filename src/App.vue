<template>
  <div id="app">
    <main-header></main-header>
    <tab-bar></tab-bar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import mainHeader from 'components/mainHeader/mainHeader'
import tabBar from 'components/tab-bar/tab-bar'
import player from 'components/player/player'

export default {
  components: {
    mainHeader,
    tabBar,
    player
  }
}
</script>

<style lang="scss">
@import 'common/scss/index.scss';
</style>
