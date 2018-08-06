import Vue from 'vue'
import Vuex from 'vuex'

// import actions from './actions'
import accountActions from './profile/actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  actions: {...accountActions},
  // actions,
  getters,
  mutations
})
