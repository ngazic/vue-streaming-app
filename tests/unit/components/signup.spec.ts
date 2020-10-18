import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils'
import Vuex, { StoreOptions } from 'vuex'
import VueRouter from 'vue-router'
import SignUp from '@/components/Auth/SignUp.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()
jest.spyOn(window, 'alert').mockImplementation(() => { console.log('mocked alert') });

describe('SignUp.vue', () => {
  interface SignUpData {
    user: string;
    password: string;
    confirmPassword: string;
  }



  let wrapper: Wrapper<SignUp>
  let user: Wrapper<SignUp>
  let password: Wrapper<SignUp>
  let confirmPassword: Wrapper<SignUp>
  let form: Wrapper<SignUp>

  function createConfig(overrides: StoreOptions<unknown>, Form: SignUpData): Wrapper<SignUp> {
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
    let MockFormData: SignUpData = {
      user: 'John Doe',
      password: 'secret1234',
      confirmPassword: 'secret1234'
    }
    it('dispatches "signup" action when correct form data is submited', async () => {
      const actions = {
        signup: jest.fn()
      }
      const wrapper = createConfig({ actions }, MockFormData);
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

      const wrapper = createConfig(config, MockFormData)
      const spy = jest.spyOn(wrapper.vm.$router, 'push')
      await form.trigger('submit.prevent')
      expect(spy).toBeCalled()
    });


    it('should show allert message on the REST API error', async () => {
      const actions = {
        signup: jest.fn().mockRejectedValue({ err: 'error message' })
      }
      const wrapper = createConfig({ actions }, MockFormData)
      const spy = jest.spyOn(window, 'alert')
      await form.trigger('submit.prevent')
      expect(spy).toHaveBeenCalledWith({ err: 'error message' })
    });
  });

  describe('Testing on incorrect user input', () => {
    let MockFormData: SignUpData = {
      user: 'John Doe',
      password: 'secret1234',
      confirmPassword: 'wrongsecret1234'
    }
    it('dispatches "signup" action when correct form data is submited', async () => {
      const actions = {
        signup: jest.fn()
      }
      const wrapper = createConfig({ actions }, MockFormData);
      await form.trigger('submit.prevent')
      expect(actions.signup).not.toHaveBeenCalled()
    });
    it('shows alert message on incorrect form data', async () => {
      const actions = {
        signup: jest.fn()
      }
      const wrapper = createConfig({ actions }, MockFormData);
      const spy = jest.spyOn(window, 'alert')
      await form.trigger('submit.prevent')
      expect(spy).toHaveBeenCalled()
    });
  })
});