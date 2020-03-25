<template>
  <div id="app">
    <router-view/>

    <transition name="rott">
      <Player v-show="fullpage" />
    </transition>
  </div>
</template>

<script>
import Player from '@/components/Player/Player'
import { mapGetters } from 'vuex'

export default {
  components: {
    Player
  },

  computed: {
    ...mapGetters('player', [
      'fullpage'
    ])
  },

  mounted () {
    this.$store.dispatch('home/getHomePage')
  }
}
</script>

<style lang="scss" scoped>
.rott-enter-active, .rott-leave-active {
  transition: all .6s;
}

.rott-enter, .rott-leave-to {
  opacity: 0;
}

.rott-enter {
  transform: rotate(45deg) translateZ(0);
  transform-origin: 100% 100%;
}
</style>