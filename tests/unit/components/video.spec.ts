import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VideoComponent from '@/components/UI/Video.vue'
import { Video } from '@/mocks/video-data.types'

describe('Video.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const getters = {
    getCurrentVideo: (): Video => currentVideo
  }
  const store = new Vuex.Store({
    getters
  })
  const currentVideo: Video = {
    id: 100,
    price: 200,
    title: "test video",
    poster: "test",
    url: "test.test"
  }
  const wrapper = shallowMount(VideoComponent, {
    localVue,
    store
  })
  it('renders current video\'s title from Vuex', () => {
    const title = wrapper.find('.container h1')
    expect(title.text()).toBe(getters.getCurrentVideo().title)
  });
  it('get current video\'s url from Vuex', () => {
    const url = wrapper.find('.container video').attributes('src')
    expect(url).toBe(getters.getCurrentVideo().url)
  });
})