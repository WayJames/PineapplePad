import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import Buefy from 'buefy'
import Amplify from 'aws-amplify'
import exports from './aws-exports'

console.log(window.localStorage)
Amplify.configure(exports)

store.dispatch('updateUser')

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
