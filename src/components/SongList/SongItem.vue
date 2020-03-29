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
    icon: { type: Boolean, default: false },
    rightIcon: { type: String, default: 'cross' },
    showRightIcon: { type: Boolean, default: false }
  },

  methods: {
    clickCorner () {
      this.$emit('click-right-icon')
    }
  }
}
</script>

<template>
  <div class="song-item" :class="{ active }">
    <div class="left-part" :class="{ popular: !icon && index < 4 }">
      <Icon v-if="icon" name="music-o" size="24px" color="#aaa" />
      <span v-else>{{ index }}</span>
    </div>
    <div class="right-part">
      <span class="title van-ellipsis">{{ data.songName }}</span>
      <span class="singer van-ellipsis">{{ data.singer }}</span>
    </div>
    <div class="corner-icon" v-if="showRightIcon" @click.stop="clickCorner">
      <Icon :name="rightIcon"></Icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variable.scss';

.song-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  transition: all .3s;

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
    overflow: hidden;
    flex: 1;

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

  .corner-icon {
    margin: 0 15px;
    color: #aaa;
  }
}
</style>