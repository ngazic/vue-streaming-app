import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils'
import Vuex, { StoreOptions } from 'vuex'
import VueRouter from 'vue-router'
import SignIn from '@/components/Auth/SignIn.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()
jest.spyOn(window, 'alert').mockImplementation(() => { console.log('mocked alert') });

describe('SignIn.vue', () => {

  const MockFormData = {
    user: 'John Doe',
    password: 'secret1234'
  }

  let wrapper: Wrapper<SignIn>
  let user: Wrapper<SignIn>
  let password: Wrapper<SignIn>
  let form: Wrapper<SignIn>

  function createConfig(overrides: StoreOptions<unknown>): Wrapper<SignIn> {
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

  it('renders correclty', () => {
    wrapper = shallowMount(SignIn)
    expect(wrapper).toMatchSnapshot()
  });

  it('dispatches "login" action when submit button is clicked', async () => {
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
        idUser: (): string => '12345'
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