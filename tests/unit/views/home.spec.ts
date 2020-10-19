import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  localVue.use(Vuex)
  const wrapper = shallowMount(Home, {
    localVue
  })

  it('should fetch some data', () => {
    expect(wrapper.findAll('.card-body').length).toBeGreaterThan(0)
  });

  it('should show modal on video clicked', () => {
    expect(true).toBe(false)
  });
  it('should redirect to clicked video if payment is confirmed', () => {
    expect(true).toBe(false)
  });
  
  

})