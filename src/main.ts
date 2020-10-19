import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'


Vue.config.productionTip = false

//Adding base url for axios auth calls
axios.defaults.baseURL = "https://spect8-streams-backend.dev.vaudience.net/api/auth/";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
