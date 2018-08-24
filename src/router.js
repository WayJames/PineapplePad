import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import Profile from './views/Profile.vue'
import ForcePasswordChange from './views/ForcePasswordChange.vue'
import ConfirmAccount from './views/ConfirmAccount.vue'
import GatherApartmentPrefs from './views/GatherApartmentPrefs.vue'
import Dashboard from './views/Dashboard.vue'
import store from './store'

import {Auth} from 'aws-amplify'

/* eslint-disable */
const AUTH_LEVEL_NONE = 0
const AUTH_LEVEL_USER = 1
const AUTH_LEVEL_ADMIN = 2
const AUTH_LEVEL_SUPERADMIN = 3
/* eslint-enable */

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {authLevel: AUTH_LEVEL_NONE},
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      meta: {authLevel: AUTH_LEVEL_NONE},
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      meta: {authLevel: AUTH_LEVEL_NONE},
      component: SignUp
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {authLevel: AUTH_LEVEL_USER}
    },
    {
      path: '/forcepasswordchange',
      name: 'force_password_change',
      meta: {authLevel: AUTH_LEVEL_NONE},
      component: ForcePasswordChange
    },
    {
      path: '/register/confirm/:username',
      name: 'confirm_account',
      component: ConfirmAccount,
      meta: {authLevel: AUTH_LEVEL_NONE}
    },
    {
      path: '/register/collectdata',
      name: 'gather_user_data',
      component: GatherApartmentPrefs,
      meta: {authLevel: AUTH_LEVEL_USER}
    },
    {
      path: '/dash',
      name: 'dashboard',
      component: Dashboard,
      meta: {authLevel: AUTH_LEVEL_USER}
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authLevel >= AUTH_LEVEL_USER)) {
    // this route requires auth, check to make sure signed in
    if (store.getters.userSignedIn) {
      next()
    } else {
      Auth.currentAuthenticatedUser().then(usr => {
        next()
      }).catch(() => {
        next({
          name: 'login',
          query: { redirect: to.fullPath }
        })
      })
    }
  } else {
    next()
  }
})

export default router
