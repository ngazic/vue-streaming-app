import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Header from '@/components/Header/Header.vue'
import { routes } from '@/router/index'

describe('Header.vue', () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  localVue.use(Vuex)
  const router = new VueRouter({ routes })
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
      router
    },
  )

  it('if user is logged in don\'t show singin and signup buttons ', () => {
    console.log(wrapper.find('.login'))
    expect(wrapper.find('.login').exists()).toBe(false)
  });

  it('should show logout button if a user is logged in ', () => {
    expect(wrapper.find('.logout').exists()).toBe(true)
  });
})
