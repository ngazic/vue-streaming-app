
import mutations from '@/store/mutations'
import { AppState, SignupNewUserResponse } from '@/store/store.types';
import state, { initialVideo } from '@/store/state'
import { Video } from '@/mocks/video-data.types';


describe('STORE', () => {
  describe('mutations.ts', () => {
    let mockState: AppState
    beforeEach(() => {
      mockState = { ...state, idToken: 'some token', currentlyPlayingVideo: { ...initialVideo } }
    })
    it('currentVideoMutation => sets the currently playing video', () => {
      const newVideo: Video = {
        id: 5,
        poster: 'test',
        title: 'video 5 test',
        price: 100,
        url: 'test.url'
      }
      mutations.currentVideoMutation(mockState, newVideo)
      expect(mockState.currentlyPlayingVideo).toBe(newVideo)
    });

    it('addcurrentVideoToPayedVideosMutation => add video to payed videos array', () => {
      const payed: Video = {
        id: 5,
        poster: 'test',
        title: 'video 5 test',
        price: 100,
        url: 'test.url'
      }
      mutations.addcurrentVideoToPayedVideosMutation(mockState, payed)
      expect(mockState.payedVideos).toContain(payed)
    });

    it('auth => should set state.idToken', () => {
      const newToken = 'some token'
      mutations.auth(mockState, newToken)
      expect(mockState.idToken).toBe(newToken)
    });

    it('logutMutation => should clear user data like token, user name,expiresIn and corresponding localStorage keys', () => {
      mockState = { ...mockState, idToken: "new token", user: 'test', expiresIn: '32233' }
      const localStorageMock = jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => { return })
      mutations.logoutMutation(mockState)
      expect(mockState.idToken).toBe('')
      expect(mockState.user).toBeNull()
      expect(mockState.expiresIn).toBeNull()
      expect(localStorageMock).toBeCalledWith('user')
      expect(localStorageMock).toBeCalledWith('idToken')
      expect(localStorageMock).toBeCalledWith('expiresIn')
    });
    
    it('login => sets the idToken, user, expiresIn and corresponding localStorage keys', () => {
      const localStorageMock = jest.spyOn(Storage.prototype, "setItem").mockImplementation(jest.fn())
      const loggedUser: SignupNewUserResponse = {
        data: {
          email: 'test@test.com',
          idToken: '12345token',
          expiresIn: '23245'
        }
      }
      mutations.login(mockState, loggedUser)
      expect(mockState.idToken).toBe(loggedUser.data.idToken)
      expect(mockState.user).toBe(loggedUser.data.email)
      expect(mockState.expiresIn).toBe(loggedUser.data.expiresIn)
      expect(localStorageMock).toBeCalledWith('user', loggedUser.data.email)
      expect(localStorageMock).toBeCalledWith('idToken', loggedUser.data.idToken)
      expect(localStorageMock).toBeCalledWith('expiresIn', loggedUser.data.expiresIn)
      expect(localStorageMock).toBeCalledWith('expirationDate', expect.anything())

    });
  })
});