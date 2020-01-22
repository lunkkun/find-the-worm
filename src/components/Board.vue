<template>
  <div class="board">
    <Tile v-for="tile in tiles" :nr="tile" :key="tile"/>
  </div>
</template>

<script>
import Tile from './Tile.vue'

export default {
  name: 'Board',
  components: {
    Tile,
  },
  computed: {
    tiles () {
      return [...Array(this.$store.state.tiles).keys()]
    },
  },
}
</script>

<style scoped>
.board {
  display: block;
  margin: auto;
}
</style>
