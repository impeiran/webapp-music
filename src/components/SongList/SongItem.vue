<script>
import { Icon } from 'vant'

export default {
  components: {
    Icon
  },

  props: {
    data: { type: Object, default: () => {} },
    active: { type: Boolean, default: false },
    index: { type: Number, default: 0 },
    icon: { type: Boolean, default: false }
  },
}
</script>

<template>
  <div class="song-item">
    <div class="left-part" :class="{ popular: !icon && index < 4 }">
      <Icon v-if="icon" name="music-o" size="24px" color="#aaa" />
      <span v-else>{{ index }}</span>
    </div>
    <div class="right-part">
      <span class="title">{{ data.songName }}</span>
      <span class="singer">{{ data.singer }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variable.scss';

.song-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .left-part {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 40px;
    height: 40px;

    &.popular {
      color: $colorRed;
    }
  }

  &.active .left-part {
    border-left: 3px solid $themeBlue;
  }

  .right-part {
    margin-left: 10px;

    span {
      display: block;

      &.title {
        font-weight: bold;
      }

      &.singer {
        font-size: 12px;
        color: #aaa;
      }
    }
  }
}
</style>