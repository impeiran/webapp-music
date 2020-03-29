<script>
import SongItem from './SongItem'
import { mapGetters } from 'vuex'

export default {
  components: {
    SongItem
  },

  props: {
    list: { type: Array, required: true },
    useIcon: { type: Boolean, default: false }
  },

  computed: {
    ...mapGetters('player', ['currentPlaySong'])
  },

  methods: {
    select (index) {
      this.$emit('select', {
        index,
        list: this.list
      })
    }
  }
}
</script>

<template>
  <div class="song-list-normal">
    <song-item 
      v-for="(item, index) in list"
      v-bind="$attrs"
      :key="item.index"
      :index="index + 1"
      :data="item"
      :icon="useIcon"
      :active="currentPlaySong.songMid === item.songMid"
      @click.native="select(index)"
      @click-right-icon="$emit('click-right-icon', item)"
    />
  </div>
</template>
