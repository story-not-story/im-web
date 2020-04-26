import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let defaultUserId = ''
try {
  if (localStorage.userId) {
    defaultUserId = localStorage.userId
  }
} catch (e) {}
export default new Vuex.Store({
  state: {
    userId: defaultUserId,
    websoket: null
  },
  mutations: {
    changeUserId (state, userId) {
      state.userId = userId
      localStorage.userId = userId
    }
  },
  actions: {
  },
  modules: {
  }
})
