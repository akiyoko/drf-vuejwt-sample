import Vue from 'vue'
// BootstrapVue
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
// import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'

Vue.config.productionTip = process.env.NODE_ENV === 'production'

// sync(store, router)

Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
