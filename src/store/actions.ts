import axios from 'axios'
import Vuex, { Action, ActionContext } from 'vuex'
import { Video } from '@/mocks/video-data.types'
import { User, SignupNewUserResponse } from './store.types'
import { AppState } from './store.types';

const apiKey = "AIzaSyCHKRges3G-vbAlsrjyg6CyPzmQ-zAmJIo";

const actions = {
  paymentAction({ commit }: ActionContext<AppState, AppState>, video: Video) {
    commit('currentVideoMutation', video)
    commit('addcurrentVideoToPayedVideosMutation', video)
  },
  signup(context: ActionContext<AppState, AppState>, user: User): Promise<void> {
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
  login(context: ActionContext<AppState, AppState>, user: User): Promise<void> {
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
  logout(context: ActionContext<AppState, AppState>): void {
    context.commit('logoutMutation')
  },
  autoLogout({ commit, state }: ActionContext<AppState, AppState>) {
    setTimeout(() => {
      console.log("LOGIN OUT AUTOMATICALY")
      commit('logoutMutation');
    }, parseInt(state.expiresIn!) * 1000);
  },
  autoLogin(context: ActionContext<AppState, AppState>): boolean {
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
    context.commit('login', { data: { user: user, idToken: token, expiresIn: localStorage.getItem('expiresIn') } })
    console.log('im autologin')
    return true;
  }
}

export default actions;