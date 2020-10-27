
import getters from '@/store/getters'
import { AppState } from '@/store/store.types';
import state, { initialVideo } from '@/store/state'


describe('STORE', () => {
  const mockState: AppState = { ...state, idToken: 'some token', currentlyPlayingVideo: { ...initialVideo } }
  describe('getters.ts', () => {
    it('isAuthenticated => return true if state.idToken not emtpy string', () => {
      const actual = getters.isAuthenticated(mockState)
      expect(actual).toBe(true)
    })
    it('getCurrentVideo => should get currenlty playing video ', () => {
      const actual = getters.getCurrentVideo(mockState)
      expect(actual).toMatchObject(initialVideo)

    });
  })
});