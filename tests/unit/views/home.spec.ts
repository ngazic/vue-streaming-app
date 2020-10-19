import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Modal from '@/components/UI/Modal.vue'
import Home from '@/views/Home.vue'
import { Video, allVideos } from '@/mocks/video-data'

describe('Home.vue', () => {
  let wrapper: Wrapper<Home>
  let video: Wrapper<Home>
  const initialVideo: Video = {
    id: -1,
    poster: '',
    price: 0,
    title: '',
    url: ''
  }
  const localVue = createLocalVue()
  const actions = {
    paymentAction: () => jest.fn()
  }
  localVue.use(VueRouter)
  localVue.use(Vuex)
  const router = new VueRouter()
  const store = new Vuex.Store({
    actions
  })

  beforeEach(() => {
    wrapper = shallowMount(Home, {
      localVue,
      store,
      router,
      data: () => ({
        videos: allVideos,
        showModal: false,
        paymentVerified: false,
        currentVideo: initialVideo
      })
    })
    video = wrapper.find('.card')
  })

  it('should fetch some data', () => {
    expect(video.exists()).toBe(true)
  });

  it('should show modal on video clicked', async () => {
    await video.trigger('click')
    expect(wrapper.findComponent(Modal).exists()).toBe(true)
  });
  it('should redirect to clicked video if payment is confirmed', () => {
  // console.log(wrapper.vm.payment)
  wrapper.setData({paymentVerified: true});
  console.log(wrapper.vm.$children)
    expect(jest.spyOn(actions,'paymentAction')).toHaveBeenCalledWith({})
  });

  it('dispatch "payment" action with payed video', () => {
    expect(true).toBe(false)

  });

  it('shows modal on video click', () => {

  });

  it('router called to watch payed video', () => {

  });

})