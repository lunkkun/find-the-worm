<template>
  <div class="tile" :class="{ blocked: blocked }" @click="open">
    <img src="../assets/worm.jpg" alt="Worm" class="tile-img" :class="{ hide: !showImg('worm') }">
    <img src="../assets/tile.jpg" alt="Tile" class="tile-img" :class="{ hide: !showImg('tile') }">
    <img src="../assets/nope.png" alt="Nope" class="tile-img" :class="{ hide: !showImg('nope') }">
    <img src="../assets/option.png" alt="The worm could be here!" class="overlay-img" :class="{ hide: !showAsOption }">
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
        return this.hasWorm ? 'worm' : 'nope'
      } else {
        return 'tile'
      }
    },
    showAsOption () {
      return this.$store.state.showOptions && this.$store.getters.isOption(this.nr)
    },
    blocked () {
      return this.$store.getters.blocked
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
  position: relative;
}
.tile-img {
  width: 100%;
  height: 100%;
}
.overlay-img {
  position: absolute;
  right: 0;
  width: 30%;
  height: 30%;
  padding: 0.5rem;
}
.hide {
  display: none;
}
.blocked {
  cursor: default;
}
</style>
