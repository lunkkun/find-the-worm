<template>
  <div class="tile" @click="open()">
    <img v-if="img === 'worm'" src="../assets/worm.jpg" :alt="'Tile ' + nr" width="100%" height="100%">
    <img v-else-if="img === 'tile'" src="../assets/tile.jpg" :alt="'Tile ' + nr" width="100%" height="100%">
    <img v-else-if="img === 'red-cross'" src="../assets/red-cross.png" :alt="'Tile ' + nr" width="100%" height="100%">
  </div>
</template>

<script>
export default {
  name: 'Tile',
  props: {
    nr: Number,
  },
  computed: {
    opened () {
      return this.$store.getters.isOpened(this.nr)
    },
    hasWorm () {
      return this.$store.getters.hasWorm(this.nr)
    },
    img () {
      if (this.opened) {
        return this.hasWorm ? 'worm' : 'red-cross'
      } else {
        return 'tile'
      }
    },
  },
  methods: {
    open () {
      this.$store.dispatch('tryTile', this.nr)
    },
  },
}
</script>

<style scoped>
.tile {
  display: inline-block;
  width: 6rem;
  height: 6rem;
  line-height: 6rem;
  text-align: center;
  vertical-align: bottom;
  font-size: 1rem;
  border: thin solid grey;
  margin: 0.2rem;
  cursor: pointer;
}
</style>
