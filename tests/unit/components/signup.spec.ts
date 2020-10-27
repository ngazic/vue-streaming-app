import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils'
import Vuex, { StoreOptions } from 'vuex'
import VueRouter from 'vue-router'
import SignUp from '@/components/Auth/SignUp.vue'

type Sign = Vue

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()
jest.spyOn(window, 'alert').mockImplementation(() => { return });

describe('SignUp.vue', () => {
  interface SignUpData {
    user: string;
    password: string;
    confirmPassword: string;
  }



  let wrapper: Wrapper<Sign>
  let user: Wrapper<Sign>
  let password: Wrapper<Sign>
  let confirmPassword: Wrapper<Sign>
  let form: Wrapper<Sign>

  function createConfig(overrides: StoreOptions<unknown>, Form: SignUpData): Wrapper<Sign> {
    const store = new Vuex.Store(overrides)

    const wrapper = shallowMount(SignUp, {
      localVue,
      store,
      router
    })
    user = wrapper.find('#user')
    password = wrapper.find('#password')
    confirmPassword = wrapper.find('#confirm-password')
    form = wrapper.find('form')
    user.setValue(Form.user)
    password.setValue(Form.password)
    confirmPassword.setValue(Form.confirmPassword)
    return wrapper
  }

  it('renders correctly', () => {
    const wrapper = shallowMount(SignUp)
    expect(wrapper).toMatchSnapshot()
  });

  describe('Testing on correct user input', () => {
    const MockFormData: SignUpData = {
      user: 'John Doe',
      password: 'secret1234',
      confirmPassword: 'secret1234'
    }
    it('dispatches "signup" action when correct form data is submited', async () => {
      const actions = {
        signup: jest.fn()
      }
      wrapper = createConfig({ actions }, MockFormData);
      await form.trigger('submit.prevent')
      expect(actions.signup).toHaveBeenCalled()
    });

    it('router called on successful signup ', async () => {
      const config = {
        actions: {
          signup: jest.fn().mockResolvedValue({})
        }
        , getters: {
          idUser: (): string => '12345'
        }
      }

      wrapper = createConfig(config, MockFormData)
      const spy = jest.spyOn(wrapper.vm.$router, 'push')
      await form.trigger('submit.prevent')
      expect(spy).toBeCalled()
    });


    it('should show allert message on the REST API error', async () => {
      const actions = {
        signup: jest.fn().mockRejectedValue({ err: 'error message' })
      }
      wrapper = createConfig({ actions }, MockFormData)
      const spy = jest.spyOn(window, 'alert')
      await form.trigger('submit.prevent')
      expect(spy).toHaveBeenCalledWith({ err: 'error message' })
    });
  });

  describe('Testing on incorrect user input', () => {
    const MockFormData: SignUpData = {
      user: 'John Doe',
      password: 'secret1234',
      confirmPassword: 'wrongsecret1234'
    }
    it('dispatches "signup" action when correct form data is submited', async () => {
      const actions = {
        signup: jest.fn()
      }
      wrapper = createConfig({ actions }, MockFormData);
      await form.trigger('submit.prevent')
      expect(actions.signup).not.toHaveBeenCalled()
    });
    it('shows alert message on incorrect confirm password', async () => {
      const actions = {
        signup: jest.fn()
      }
      wrapper = createConfig({ actions }, MockFormData);
      const spy = jest.spyOn(window, 'alert')
      await form.trigger('submit.prevent')
      expect(spy).toHaveBeenLastCalledWith("Please confirm correct password!!!")
    });
    it('shows alert message on password shorter than 6 chars', async () => {
      const actions = {
        signup: jest.fn()
      }
      wrapper = createConfig({ actions }, Object.assign({...MockFormData, password: 'shrt'}));
      const spy = jest.spyOn(window, 'alert')
      await form.trigger('submit.prevent')
      expect(spy).toHaveBeenLastCalledWith("Enter 6 characters minimum!!!")
  })
});
});