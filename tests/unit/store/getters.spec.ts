
import getters from '@/store/getters'
import { AppState } from '@/store/store.types';

describe('STORE', () => {
  const state: AppState = {
    idToken: '',
    currentlyPlayingVideo: {
      title: 'test',
      src: 'test.test'
    }
  }
  describe('getters.ts', () => {
    it('isAuthenticated => return true if state.idToken not emtpy string', () => {
      const actual = getters.isAuthenticated(state)
    })
  })
});