<template>
  <transition name="slide">
    <div class="album-detail">

    </div>
  </transition>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import 'common/scss/variable.scss';
.album-detail{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  background: $bgColor;
}
.slide-enter-active, .slide-leave-active{
  transition: transform 0.4s;
}
.slide-enter, .slide-leave-to{
  transform: translate3d(100%,0,0);
}
</style>
