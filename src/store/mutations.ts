import { AppState, SignupNewUserResponse } from './store.types';
import { Video } from '@/mocks/video-data.types'

const   mutations = {
  currentVideoMutation(state: AppState, video: Video): void {
    state.currentlyPlayingVideo = video
  },
  addcurrentVideoToPayedVideosMutation(state: AppState, video: Video): void {
    state.payedVideos.indexOf(video) === -1 ? state.payedVideos.push(video) : console.log('this video is already payed')
  },
  auth(state: AppState, userId: string): void {
    state.idToken = userId;
  },
  logoutMutation(state: AppState): void {
    state.idToken = '';
    state.user = null;
    state.expiresIn = null;

    //Deleting local storage 
    localStorage.removeItem('user');
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresIn');
  },
  login(state: AppState, response: SignupNewUserResponse) {
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
}

export default mutations;