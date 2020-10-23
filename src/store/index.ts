import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Video } from '@/mocks/video-data.types'
import { User, SignupNewUserResponse, AppState } from './store.types'

Vue.use(Vuex)

// API keys for firebase
const apiKey = "AIzaSyCHKRges3G-vbAlsrjyg6CyPzmQ-zAmJIo";

const initialVideo: Video = {
  id: -1,
  poster: '',
  price: 0,
  title: '',
  url: ''
}


const initialPayedVideosList: Video[] = []

const state: AppState = {
  idToken: '',
  currentlyPlayingVideo: initialVideo,
  payedVideos: initialPayedVideosList,
  error: null,
  expiresIn: null,
  user: null
};

export default new Vuex.Store({
  state,
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
    auth(state, userId: string): void {
      state.idToken = userId;
    },
    logoutMutation(state): void {
      state.idToken = '';
      state.user = null;
      state.expiresIn = null;

      //Deleting local storage 
      localStorage.removeItem('user');
      localStorage.removeItem('idToken');
      localStorage.removeItem('expiresIn');
    },
    login(state, response: SignupNewUserResponse) {
      state.idToken = response.data.idToken;
      state.expiresIn = response.data.expiresIn;
      state.user = response.data.email;
      const expiresIn = Date.now() + parseInt(state.expiresIn)*1000;
      console.log(expiresIn)
      localStorage.setItem('user', state.user);
      localStorage.setItem('idToken', state.idToken);
      localStorage.setItem('expirationDate', expiresIn.toString());
      localStorage.setItem('expiresIn', state.expiresIn);

    }
  },
  actions: {
    paymentAction({ commit }, video) {
      commit('currentVideoMutation', video)
      commit('addcurrentVideoToPayedVideosMutation', video)
    },
    signup(context, user: User): Promise<void> {
      return axios
        .post("/accounts:signUp?key=" + apiKey, {
          email: user.email,
          password: user.password,
          returnSecureToken: true
        }).then(res => {
          context.commit("login", res);
          context.dispatch("autoLogout");
          return res;
        })
        .catch(err => {
          console.log(err)
          context.state.error = err;
          console.log(typeof err)
          console.log(JSON.stringify(err));
          for (const o in err)
            console.log(o)
          return err;
        });
    },
    login(context, user: User): Promise<void> {
      return axios
        .post("/accounts:signInWithPassword?key=" + apiKey, {
          email: user.email,
          password: user.password,
          returnSecureToken: true
        })
        .then(res => {
          context.commit("login", res);
          context.dispatch("autoLogout");
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err.response.data.error);
          alert(err.response.data.error.message);

        });
    },
    logout(context): void {
      context.commit('logoutMutation')
    },
    autoLogout({ commit, state }) {
      setTimeout(() => {
        console.log("LOGIN OUT AUTOMATICALY")
        commit('logoutMutation');
      }, parseInt(state.expiresIn!) * 1000);
    },
    autoLogin(context): boolean {
      console.log('im autologin') 
      const token = localStorage.getItem('idToken');
      console.log(token)
      if (!token) {
        return false;
      }
      const expirationDate = localStorage.getItem('expirationDate');
      const now = Date.now();
      console.log(now)
      console.log(expirationDate)
      if (now >= parseInt(expirationDate!)) {
        return false;
      }

      const user = localStorage.getItem('user');
      context.commit('login', {data:{user: user, idToken: token, expiresIn: localStorage.getItem('expiresIn')}})
      console.log('im autologin') 
      return true;
    }
  },
  modules: {
  }
})
