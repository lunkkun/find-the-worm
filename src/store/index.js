import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tiles: 6,
    opened: null,
    worm: 0,
    history: [],
    options: [],
    showOptions: false,
    timeouts: [],
  },
  getters: {
    turnsTaken: (state) => {
      return state.history.length
    },
    won: (state) => {
      return state.opened === state.worm
    },
    blocked: (state) => {
      return state.opened !== null
    },
    nextWormOptions: (state, getters) => {
      return getters.neighbours(state.worm)
    },
    isOpened: (state) => (tile) => {
      return state.opened === tile
    },
    hasWorm: (state) => (tile) => {
      return state.worm === tile
    },
    isOption: (state) => (tile) => {
      return state.options[tile]
    },
    neighbours: (state) => (tile) => {
      let neighbours = []
      if (tile > 0) {
        neighbours.push(tile - 1)
      }
      if (tile < state.tiles - 1) {
        neighbours.push(tile + 1)
      }
      return neighbours
    },
  },
  mutations: {
    setTiles (state, tiles) {
      state.tiles = tiles
    },
    openTile (state, tile) {
      state.opened = tile
    },
    addToHistory (state, tile) {
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
    setOptions (state, options) {
      state.options = options
    },
    toggleShowOptions (state) {
      state.showOptions = !state.showOptions
    },
  },
  actions: {
    reset ({ commit }) {
      let tiles = 6
      let worm = Math.floor(Math.random() * tiles)
      let options = Array(tiles).fill(true)
      commit('clearTimeouts')
      commit('closeTile')
      commit('setTiles', tiles)
      commit('setWorm', worm)
      commit('setOptions', options)
      commit('clearHistory')
    },
    tryTile ({ getters, commit, dispatch }, tile) {
      if (!getters.blocked) {
        commit('openTile', tile)
        commit('addToHistory', tile)
        if (!getters.won) {
          commit('setTimeout', {
            callback: () => {
              commit('closeTile')
              dispatch('moveWorm')
              dispatch('updateOptions', tile)
            },
            timeout: 600,
          })
        }
      }
    },
    moveWorm ({ getters, commit }) {
      let options = getters.nextWormOptions
      let next = options[Math.floor(Math.random() * options.length)]
      commit('setWorm', next)
    },
    updateOptions ({ state, getters, commit }, tile) {
      let options = state.options.map((option, index) => {
        return getters.neighbours(index).some(neighbour => {
          return state.options[neighbour] && neighbour !== tile
        })
      })
      commit('setOptions', options)
    },
  },
})
