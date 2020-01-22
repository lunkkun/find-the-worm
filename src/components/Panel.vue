<template>
  <div class="panel">
    <button class="reset" @click="reset">Reset</button>
    <button class="options" @click="toggleShowOptions">
      <span v-if="!showOptions">Show possible locations</span>
      <span v-else>Hide possible locations</span>
    </button>
    <button class="undo" @click="undo" :class="{ disabled: !canUndo }">Undo</button>
    <br>
    <span>Turns taken: {{ turnsTaken }}</span>
    <br>
    <span v-if="won">You won!</span>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  computed: {
    turnsTaken () {
      return this.$store.getters.turnsTaken
    },
    canUndo () {
      return this.$store.getters.canUndo
    },
    won () {
      return this.$store.getters.won
    },
    showOptions () {
      return this.$store.state.showOptions
    },
  },
  methods: {
    reset () {
      this.$store.dispatch('reset')
    },
    undo () {
      this.$store.dispatch('undo')
    },
    toggleShowOptions () {
      this.$store.commit('toggleShowOptions')
    },
  },
}
</script>

<style scoped>
.panel {
  margin-top: 0.5rem;
}
button {
  border-width: 1px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  margin: 0.5rem;
}
button:focus {
  outline:0;
}
button.reset {
  border-color: darkred;
  color: darkred;
  background-color: lightgrey;
}
button.options {
  border-color: darkgreen;
  color: darkgreen;
  background-color: lightgrey;
}
button.undo {
  border-color: darkgreen;
  color: darkgreen;
  background-color: lightgrey;
}
button.disabled {
  opacity: 0.5;
  cursor: default;
}
</style>
