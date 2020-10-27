import {AppState } from './store.types'
import { Video } from '@/mocks/video-data.types'

export const initialVideo: Video = {
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


export default state;