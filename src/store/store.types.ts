import { Video } from '../mocks/video-data.types'
export interface User {
  user: string;
  password: string;
  email: string;
}

export interface SignupNewUserResponse {
  data: {
    idToken: string;
    email: string;
    expiresIn: string;
  }
}

export interface AppState {
  idToken: string;
  currentlyPlayingVideo: Video;
  payedVideos: Video[];
  error: null | string;
  expiresIn: string | null;
  user: string | null;
}