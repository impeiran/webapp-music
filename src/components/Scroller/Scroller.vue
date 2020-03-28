<script>
export default {
  props: {}
}
</script>

<template>
  <div class="scroller-wrapper">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.scroller-wrapper {
  height: 100%;
  overflow: auto;
}
</style>
