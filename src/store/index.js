import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tiles: 6,
    opened: null,
    worm: 0,
    history: [],
    timeouts: [],
  },
  getters: {
    nextWormOptions: (state) => {
      let options = []
      if (state.worm > 0) {
        options.push(state.worm - 1)
      }
      if (state.worm < state.tiles - 1) {
        options.push(state.worm + 1)
      }
      return options
    },
    isOpened: (state) => (tile) => {
      return state.opened === tile
    },
    blocked: (state) => {
      return state.opened !== null
    },
    hasWorm: (state) => (tile) => {
      return state.worm === tile
    },
    turnsTaken: (state) => {
      return state.history.length
    },
    won: (state) => {
      return state.opened === state.worm
    },
  },
  mutations: {
    setTiles (state, tiles) {
      state.tiles = tiles
    },
    openTile (state, tile) {
      state.opened = tile
      state.history.push({
        worm: state.worm,
        opened: tile,
      })
    },
    closeTile (state) {
      state.opened = null
    },
    setWorm (state, tile) {
      state.worm = tile
    },
    clearHistory (state) {
      state.history = []
    },
    setTimeout (state, { callback, timeout }) {
      state.timeouts.push(setTimeout(callback, timeout))
    },
    clearTimeouts (state) {
      state.timeouts.forEach(timeout => clearTimeout(timeout))
      state.timeouts = []
    },
  },
  actions: {
    reset ({ commit }) {
      let tiles = 6
      let worm = Math.floor(Math.random() * tiles)
      commit('clearTimeouts')
      commit('closeTile')
      commit('setTiles', tiles)
      commit('setWorm', worm)
      commit('clearHistory')
    },
    tryTile ({ getters, commit, dispatch }, tile) {
      if (!getters.blocked) {
        commit('openTile', tile)
        if (!getters.won) {
          commit('setTimeout', {
            callback: () => {
              commit('closeTile')
              dispatch('moveWorm')
            },
            timeout: 1000,
          })
        }
      }
    },
    moveWorm ({ commit, getters }) {
      let options = getters.nextWormOptions
      let next = options[Math.floor(Math.random() * options.length)]
      commit('setWorm', next)
    },
  },
})
