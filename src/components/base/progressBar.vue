<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="progress" ref="progress"></div>
    <div class="progress-btn-box"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd" ref="progressBtn">
      <div class="progress-btn"></div>
    </div>
  </div>
</template>

<script>
import {prefixStyle} from 'common/js/dom'

// const progressBtnWidth = 16
const transform = prefixStyle('transform')

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.touch = {}
  },
  methods: {
    progressTouchStart (e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchMove (e) {
      if (!this.touch.initiated) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth, Math.max(0, this.touch.left + deltaX))
      this._offset(offsetWidth)
    },
    progressTouchEnd (e) {
      this.touch.initiated = false
      this._triggerPercent()
    },
    progressClick (e) {
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      this._offset(offsetWidth)
      this._triggerPercent()
    },
    _triggerPercent () {
      const barWidth = this.$refs.progressBar.clientWidth
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChange', percent)
    },
    _offset (offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
    }
  },
  watch: {
    percent (newPercent) {
      if (newPercent >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth
        const offsetWidth = newPercent * barWidth
        this._offset(offsetWidth)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'common/scss/variable.scss';
  .progress-bar{
    position: relative;
    height: 2px;
    background: rgba(170, 170, 170, 0.3);
    &::before{
      position: absolute;
      content: '';
      left: -6px;
      right: -6px;
      bottom: -6px;
      top: -6px;
    }
    .progress{
      position: absolute;
      height: 100%;
      background: $themeColor;
    }
    .progress-btn-box{
      position: absolute;
      left: -15px;
      top: -14px;
      width: 30px;
      height: 30px;
      .progress-btn{
        position: relative;
        left: 10px;
        top: 10px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        box-shadow: 0 0 8px $themeColor;
        background: $themeColor;
      }
    }
  }
</style>
