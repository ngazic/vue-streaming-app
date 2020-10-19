import Vue from 'vue'
import Vuex from 'vuex'
import { Video } from '@/mocks/video-data'
Vue.use(Vuex)
import axios from 'axios'

const initialVideo: Video = {
  id: -1,
  poster: '',
  price: 0,
  title: '',
  url: ''
}
interface User {
  user: string;
  password: string;
  email: string;
}
const initialPayedVideosList: Video[] = []

export default new Vuex.Store({
  state: {
    idToken: '',
    currentlyPlayingVideo: initialVideo,
    payedVideos: initialPayedVideosList
  },
  getters: {
    isAuthenticated(state): boolean {
      return state.idToken !== ''
    },
    getCurrentVideo(state): Video {
      return state.currentlyPlayingVideo
    }
  },
  mutations: {
    currentVideoMutation(state, video: Video): void {
      state.currentlyPlayingVideo = video
    },
    addcurrentVideoToPayedVideosMutation(state, video: Video): void {
      state.payedVideos.indexOf(video) === -1 ? state.payedVideos.push(video) : console.log('this video is already payed')
    },
    auth(store, userId: string): void {
      store.idToken = userId;
    }
  },
  actions: {
    paymentAction({ commit }, video) {
      commit('currentVideoMutation', video)
      commit('addcurrentVideoToPayedVideosMutation', video)
    },
    signup(context, user: User): Promise<any> {
      return axios.post("signup", {
        email: user.email,
        password: user.password,
        username: user.user
      })
    },
    login( context, user: User): Promise<void> | null {
      if(user.user === "test" && user.password === 'test') {
        console.log(user.user)
        context.commit('auth', user.user)
        return Promise.resolve()
      }
      return axios.post("signin", {
        password: user.password,
        loginId: user.user
      }) as Promise< void>
    },
  },
  modules: {
  }
})
