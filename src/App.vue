<template>
  <div id="app">
    <router-view/>

    <Player />
  </div>
</template>

<script>
import Player from '@/components/Player/Player'

export default {
  components: {
    Player
  },

  mounted () {
    this.$store.dispatch('home/getHomePage')
  }
}
</script>

<style lang="scss" scoped>
</style>