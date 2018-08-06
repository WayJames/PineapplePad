import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import Profile from './views/Profile.vue'
import ForcePasswordChange from './views/ForcePasswordChange.vue'
import ConfirmAccount from './views/ConfirmAccount.vue'
import GatherUserData from './views/GatherUserData.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: SignUp
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/forcepasswordchange',
      name: 'force_password_change',
      component: ForcePasswordChange
    },
    {
      path: '/register/confirm',
      name: 'confirm_account',
      component: ConfirmAccount
    },
    {
      path: '/register/collectdata',
      name: 'gather_user_data',
      component: GatherUserData
    }
  ]
})
