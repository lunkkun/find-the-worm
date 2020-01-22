<template>
  <div class="tile" @click="open()">
    <img src="../assets/worm.jpg" :alt="'Tile ' + nr" :class="{ hide: !showImg('worm') }">
    <img src="../assets/tile.jpg" :alt="'Tile ' + nr" :class="{ hide: !showImg('tile') }">
    <img src="../assets/red-cross.png" :alt="'Tile ' + nr" :class="{ hide: !showImg('red-cross') }">
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
    showImg (img) {
      return img === this.img
    },
  },
}
</script>

<style scoped>
.tile {
  display: inline-block;
  width: 6rem;
  height: 6rem;
  margin: 0.2rem;
  cursor: pointer;
}
img {
  width: 100%;
  height: 100%;
}
.hide {
  display: none;
}
</style>
