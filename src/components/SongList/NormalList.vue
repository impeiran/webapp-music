<script>
import SongItem from './SongItem'

export default {
  components: {
    SongItem
  },

  props: {
    list: { type: Array, required: true },
    useIcon: { type: Boolean, default: false }
  }
}
</script>

<template>
  <div class="song-list-normal">
    <song-item 
      v-for="(item, index) in list"
      :key="item.songId"
      :index="index + 1"
      :data="item"
      :icon="useIcon"
    />
  </div>
</template>
