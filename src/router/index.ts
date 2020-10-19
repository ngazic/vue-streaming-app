import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
import SignIn from '@/components/Auth/SignIn.vue'
import SignUp from '@/components/Auth/SignUp.vue'
import Video from '@/components/UI/Video.vue'

Vue.use(VueRouter)


function authentification(to, from, next): void {
  if (store.getters.isAuthenticated) {
    next()
  } else {
    next('/signin')
  }
}

export const routes: Array<RouteConfig> = [
  { path: '/signup', component: SignUp },
  { path: '/signin', component: SignIn },
  {
    path: '/watch', component: Video,
    beforeEnter(to, from, next) {
      authentification(to, from, next)
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      authentification(to, from, next)
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
