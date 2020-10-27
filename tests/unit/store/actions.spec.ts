
import actions from '@/store/actions'
import { AppState, User } from '@/store/store.types';
import state, { initialVideo } from '@/store/state'
import { ActionContext, Commit } from 'vuex';
import axios from 'axios'


  jest.spyOn(Storage.prototype,'getItem').mockImplementation((key: string): string => {
    if(key === 'idToken'){
      return 'sometoken1234'
    }
    else if(key === 'expirationDate'){
      return Date.now()+'600000'
    }
    return 'somestring'
  })
describe('STORE', () => {
  let mockState: AppState
  let commit: Commit
  let context: ActionContext<AppState, AppState>
  let user: User
  beforeEach(() => {
    mockState = { ...state, idToken: 'some token', currentlyPlayingVideo: { ...initialVideo } }
    commit = jest.fn()
    context = {
      commit,
        dispatch: jest.fn(),
          getters: jest.fn(),
            state: mockState,
              rootState: mockState,
                rootGetters: jest.fn()
    }
    user = {
      email: 'test@test.com',
      password: 'some1234secret',
      user: 'user@test.com'
    }
    jest.spyOn(axios, 'post').mockResolvedValue(user)
  })

  describe('actions.ts', () => {
    it('paymentAction => commits curentVideoMutation and addCurrentVideoToPayedVideosMutation', () => {
      actions.paymentAction(context, initialVideo)
      expect(commit).toBeCalledWith("currentVideoMutation", initialVideo)
      expect(commit).toBeCalledWith("addcurrentVideoToPayedVideosMutation", initialVideo)
    });

    it('signup => commits "login" mutation with user and dispatchs "autoLogout" mutation', async () => {
      await actions.signup(context, user)
      expect(commit).toBeCalledWith("login", user)
      expect(context.dispatch).toBeCalledWith("autoLogout")
    });

    it('login => commits "login" mutation with user and dispatchs "autoLogout" mutation', async () => {
      await actions.login(context, user)
      expect(commit).toBeCalledWith("login", user)
      expect(context.dispatch).toBeCalledWith("autoLogout")
    });

    it('logout => commits "logoutMutation"', () => {
      actions.logout(context)
      expect(commit).toBeCalledWith('logoutMutation')
    });

    it('autoLogin => commits "login" mutation if localStorage keys "idToken" and "expirationDate" are set up correctly', () => {
      actions.autoLogin(context)
      expect(commit).toBeCalledWith('login', expect.anything())
    });
  })
});