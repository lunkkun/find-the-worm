<template>
  <div>
    <h1>Find the worm!</h1>
    <p>
      A worm is hiding beneath one of the tiles. Click a tile to check underneath.<br>
      If you didn't find the worm, it will move to an adjacent tile. Good luck!
    </p>
    <Board/>
    <Panel/>
  </div>
</template>

<script>
import Board from './Board.vue'
import Panel from './Panel.vue'

export default {
  name: 'Game',
  components: {
    Board,
    Panel,
  },
  created: function () {
    this.reset()
  },
  methods: {
    reset () {
      this.$store.dispatch('reset')
    },
  },
}
</script>

<style scoped>

</style>
