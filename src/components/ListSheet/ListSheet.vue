<script>
import SongList from '@/components/SongList/NormalList'
import { Popup, Image, Button } from 'vant'

export default {
  components: {
    SongList,
    Popup,
    Button,
    VantImage: Image
  },

  props: {
    name: { type: String, default: '' },
    info: { type: String, default: '' },
    pic: { type: String, default: '' },
    listenNum: { type: [String, Number], default: 0 },
    total: { type: [String, Number], default: 0 },
    list: { type: Array, default: () => [] }
  },

  data () {
    return {
      showBanner: false
    }
  },

  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll () {
      this.showBanner = document.documentElement.scrollTop > 250
    } 
  }
}
</script>

<template>
  <div class="song-list">
    <div class="info-panel box-shadow-border">
      <vant-image
        :src="pic"
        class="info-pic box-shadow-block"
        width="120"
        height="120"
        radius="10"
      />

      <div class="description">
        <h3>{{ name || ' ' }}</h3>
        <div class="info-item">播放量：{{ listenNum }}次</div>
        <div class="info-item">歌曲数：{{ total }}首</div>
        <Button 
          class="play-button"
          type="info" 
          size="small" 
          round
        >点击播放全部</Button>
      </div>

      <popup
        v-model="showBanner"
        class="box-shadow-border"
        position="top"
        :overlay="false"
        :lock-scroll="false"
      >
        <div class="banner">
          <vant-image :src="pic" width="30" height="30" radius="4" />
          <span class="name">{{ name }}</span>
          <span class="info-item">播放量：{{ listenNum }}次</span>
        </div>
      </popup>
    </div>

    <div :style="{ padding: '10px 0' }">
      <song-list :list="list" />
    </div>

  </div>
</template>

<style lang="scss" scoped>
.info-panel {
  display: flex;
  align-items: center;
  padding: 30px 25px;
  background: #fff;

  .info-pic {
    flex: 0 0 120px;
  }

  .info-item {
    color: #aaa;
  }

  .description {
    margin-left: 15px;

    & > * {
      margin-bottom: 6px;
    }

    .play-button {
      padding: 4px 15px;
      line-height: 14px;
      font-weight: bold;
      box-shadow: 0 6px 32px rgba(25,137,250,.5);
    }
  }

  .banner {
    display: flex;
    align-items: center;
    padding: 10px;

    &>span {
      display: inline-block;
      margin-left: 10px;
    }

    .name {
      font-weight: bold;
    }
  }
}
</style>