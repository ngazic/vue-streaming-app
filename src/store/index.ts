import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: ''
  },
  getters: {
    isAuthenticated(state): boolean{
      return state.idToken != null
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
