import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
Vue.config.productionTip = false
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000";
Vue.prototype.$reqs = axios;

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
