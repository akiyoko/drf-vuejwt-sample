import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      username: '',
      loggedIn: false
    }
  },
  getters: {
    username: state => state.user.username,
    loggedIn: state => state.user.loggedIn
  },
  mutations: {
    updateUser (state, payload) {
      if (payload && payload.user) {
        state.user.username = payload.user.username
        state.user.loggedIn = true
      } else {
        state.user.username = ''
        state.user.loggedIn = false
      }
    }
  },
  actions: {
    setUser ({ commit }, payload) {
      commit('updateUser', {user: payload.user})
    },
    removeUser ({ commit }) {
      commit('updateUser')
    }
  }
})

export default store
