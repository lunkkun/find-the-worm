<template>
  <div class="panel">
    <button class="button" @click="reset">Reset</button><br>
    <span>Turns taken: {{ turnsTaken }}</span><br>
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
    won () {
      return this.$store.getters.won
    },
  },
  methods: {
    reset () {
      this.$store.dispatch('reset')
    },
  },
}
</script>

<style scoped>
.panel {
  margin-top: 1rem;
}
.button {
  background-color: darkred;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  margin-bottom: 0.5rem;
}
</style>
