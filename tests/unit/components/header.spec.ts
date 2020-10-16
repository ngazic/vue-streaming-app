import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Header from '@/components/Header/Header.vue'

describe('Header.vue', () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  localVue.use(Vuex)

  describe('show/hide links on authentification', () => {
    const store = new Vuex.Store({
      getters: {
        isAuthenticated(): boolean {
          return true;
        }
      }
    })
    const wrapper = shallowMount(Header,
      {
        store,
        localVue,
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
  });
})