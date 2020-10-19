import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Header from '@/components/Header/Header.vue'

describe('Header.vue', () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  localVue.use(Vuex)

  describe('show/hide links on authentification', () => {
    const router = new VueRouter()
    const actions = {
      logout: jest.fn()
    }
    const store = new Vuex.Store({
      getters: {
        isAuthenticated(): boolean {
          return true;
        },
      },
      actions
    })
    const wrapper = shallowMount(Header,
      {
        store,
        localVue,
        router
      },
    )
    // for debbuging wrapper uncomment this line:
    // wrapper.overview()

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('if user is logged in don\'t show singin and signup buttons ', () => {
      expect(wrapper.find('.login').exists()).toBe(false)
    });

    it('should show logout button if a user is logged in ', () => {
      expect(wrapper.find('.logout').exists()).toBe(true)
    });
    it('should dispatch "logout" action on logout button clicked', async () => {
      await wrapper.find('.logout').trigger('click');
      expect(actions.logout).toHaveBeenCalled()
    });
    it('should call router push method after loging out', async () => {
      const spy = jest.spyOn(wrapper.vm.$router,'push')
      await wrapper.find('.logout').trigger('click');
      expect(spy).toHaveBeenCalled()
    });
  });
})