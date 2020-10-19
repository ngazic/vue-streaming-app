import Vue from 'vue'
import Vuex from 'vuex'
import {Video} from '@/mocks/video-data'
Vue.use(Vuex)

const initialVideo: Video = {
  id: -1,
  poster: '',
  price: 0,
  title: '',
  url: ''
}

export default new Vuex.Store({
  state: {
    idToken: '',
    currentlyPlayingVideo: initialVideo
  },
  getters: {
    isAuthenticated(): boolean{
      return true;
      // return state.idToken !== ''
    },
    getCurrentVideo(state): Video {
      return state.currentlyPlayingVideo
    }
  },
  mutations: {
    currentVideoMutation(state, video: Video): void {
     state.currentlyPlayingVideo = video
    },
  },
  actions: {
    paymentAction({ commit }, video) {
      commit('currentVideoMutation', video)
    }
  },
  modules: {
  }
})
