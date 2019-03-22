import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userModule = {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    username: '',
    loggedIn: false
  },
  mutations: {
    setUser (state, payload) {
      state.username = payload.user.username
      state.loggedIn = true
    },
    removeUser (state) {
      state.username = ''
      state.loggedIn = false
    }
  },
  actions: {
    setUser ({ commit }, payload) {
      commit('setUser', payload)
    },
    removeUser ({ commit }) {
      commit('removeUser')
    }
  }
}

const messageModule = {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    error: '',
    warnings: [],
    info: '',
    showSeconds: 10
  },
  mutations: {
    setMessage (state, payload) {
      state.showSeconds = 10
      if (payload.error) {
        state.error = payload.error
        state.warnings = []
        state.info = ''
      } else if (payload.warnings) {
        state.error = ''
        state.warnings = payload.warnings
        state.info = ''
      } else if (payload.info) {
        state.error = ''
        state.warnings = []
        state.info = payload.info
      }
    },
    clearMessage (state) {
      state.error = ''
      state.warnings = []
      state.info = ''
    }
  }
}

const store = new Vuex.Store({
  modules: {
    user: userModule,
    message: messageModule
  }
})

export default store
