import { AppState } from './store.types';
import { Video } from '@/mocks/video-data.types';

const   getters = {
  isAuthenticated(state: AppState): boolean {
    return state.idToken !== ''
  },
  getCurrentVideo(state: AppState): Video {
    return state.currentlyPlayingVideo
  }
}

export default getters;