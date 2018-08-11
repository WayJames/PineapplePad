import { Auth, API } from 'aws-amplify'
import router from '@/router'

export default {
  async signOut ({ commit }) {
    await Auth.signOut()
    router.push('/')
    commit('setUser', null)
  },
  async updateUser ({ commit }) {
    try {
      let user = await Auth.currentAuthenticatedUser()
      commit('setUser', user)
      return user
    } catch (err) {
      commit('setUser', null)
      throw err
    }
  },
  async signIn ({ commit, dispatch }, { username, password, redirect }) {
    try {
      let user = await Auth.signIn(username, password)
      commit('setUser', user)
      try {
        let prefs = await dispatch('getApartmentPrefs')
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          router.push({ name: 'force_password_change' })
        } else if (prefs.length === 0) {
          router.push({name: 'gather_user_data'})
        } else if (redirect) {
          router.push(redirect)
        } else {
          router.push({ name: 'profile' })
        }
      } catch (err) {
        throw err
      }
      return user
    } catch (err) {
      throw err
    }
  },
  async forgotPassword (context, { username }) {
    try {
      return await Auth.forgotPassword(username)
    } catch (err) {
      switch (err.code) {
        case 'NotAuthorizedException':
          err.message = 'An error occurred. Please contact support.'
          break
        case 'UserNotFoundException':
          err.message = 'User not found.'
          break
      }
      throw err
    }
  },
  async changePassword (context, { oldPass, newPass }) {
    try {
      return await Auth.changePassword(context.state.user, oldPass, newPass)
    } catch (err) {
      throw err
    }
  },
  async resetPassword (context, { username, password, code }) {
    try {
      return await Auth.forgotPasswordSubmit(username, code, password)
    } catch (err) {
      throw err
    }
  },
  async signUp ({commit}, args) {
    try {
      let user = await Auth.signUp(args)
      if (!user.userConfirmed) {
        commit('storePasswordTemporarily', args.password)
        router.push({name: 'confirm_account', params: {username: args.username}})
      }
      return user
    } catch (err) {
      throw err
    }
  },
  async updateUserAttributes ({dispatch, state}, args) {
    try {
      await Auth.updateUserAttributes(state.user, args)
      try {
        let user = await dispatch('updateUser')
        return user
      } catch (err) {
        throw err
      }
    } catch (err) {
      throw err
    }
  },
  async submitVerificationCode ({dispatch, state}, {username, code}) {
    try {
      let resp = await Auth.confirmSignUp(username, code)
      // Confirming sign up doesn't log the user in.
      // So we do this to seamlessly sign the user in behind the scenes
      if (state.passwordTemporaryStorage) {
        try {
          await dispatch('signIn', {username, password: state.passwordTemporaryStorage})
          router.push({name: 'gather_user_data'})
        } catch (err) {
          err.message = 'An unexpcted error occurred. Please contact us.'
          throw err
        }
      }
      return resp
    } catch (err) {
      switch (err.code) {
        case 'UserNotFoundException':
          err.message = 'User not found.'
          break
      }
      throw err
    }
  },
  async submitApartmentPrefs (context, attributes) {
    try {
      let resp = await API.post('account_attributesCRUD', '/account_attributes', {body: attributes})
      router.push({name: 'profile'})
      return resp
    } catch (err) {
      throw err
    }
  },
  async getApartmentPrefs ({commit}) {
    try {
      let resp = await API.get('account_attributesCRUD', '/account_attributes')
      if (resp.length) {
        commit('setApartmentPrefs', resp[0])
      } else {
        throw resp
      }
      return resp[0]
    } catch (err) {
      throw err
    }
  }
}
