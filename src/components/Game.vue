<template>
  <div>
    <h1>Find the worm!</h1>
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
