import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils'
import Vuex, { StoreOptions } from 'vuex'
import VueRouter from 'vue-router'
import SignIn from '@/components/Auth/SignIn.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()
jest.spyOn(window, 'alert').mockImplementation(() => { return });

describe('SignIn.vue', () => {

  const MockFormData = {
    user: 'John Doe',
    password: 'secret1234'
  }

  let wrapper: Wrapper<Vue>
  let user: Wrapper<Vue>
  let password: Wrapper<Vue>
  let form: Wrapper<Vue>

  function createConfig(overrides: StoreOptions<unknown>): Wrapper<Vue> {
    const store = new Vuex.Store(overrides)

    const wrapper = shallowMount(SignIn, {
      localVue,
      store,
      router
    })
    user = wrapper.find('#user')
    password = wrapper.find('#password')
    form = wrapper.find('form')
    user.setValue(MockFormData.user)
    password.setValue(MockFormData.password)
    return wrapper
  }

  it('renders correctly', () => {
    wrapper = shallowMount(SignIn)
    expect(wrapper).toMatchSnapshot()
  });

  it('dispatches "login" action when form is submited', async () => {
    const actions = {
      login: jest.fn()
    }



    wrapper = createConfig({ actions });
    await form.trigger('submit.prevent')
    expect(actions.login).toHaveBeenCalled()

  });

  it('router called on successful login ', async () => {
    const config = {
      actions: {
        login: jest.fn().mockResolvedValue({})
      }
      , getters: {
        isAuthenticated: (): boolean  => true
      }
    }

    wrapper = createConfig(config);
    const spy = jest.spyOn(wrapper.vm.$router, 'push')
    await form.trigger('submit.prevent')
    expect(spy).toBeCalled()
  });


  it('should show allert message on the REST API error', async () => {
    const actions = {
      login: jest.fn().mockRejectedValue({ err: 'error message' })
    }
    wrapper = createConfig({ actions })
    const spy = jest.spyOn(window, 'alert')
    await form.trigger('submit.prevent')
    expect(spy).toHaveBeenCalledWith({ err: 'error message' })
  });


});