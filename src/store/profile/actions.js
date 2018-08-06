import { Auth, API } from 'aws-amplify'
import router from '@/router'

export default {
  async signOut ({ commit }) {
    await Auth.signOut()
    commit('setUser', null)
  },
  async updateUser ({ commit, dispatch }) {
    try {
      let user = await Auth.currentAuthenticatedUser()
      commit('setUser', user)
      return user
    } catch (err) {
      dispatch('signOut')
    }
  },
  async signIn ({ commit }, { username, password }) {
    try {
      let user = await Auth.signIn(username, password)
      commit('setUser', user)
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
  async signUp (context, args) {
    try {
      let user = await Auth.signUp(args)
      if (!user.userConfirmed) {
        router.push('confirm_account')
      }
      return user
    } catch (err) {
      throw err
    }
  },
  async submitVerificationCode (context, {username, code}) {
    try {
      let resp = await Auth.confirmSignUp(username, code)
      router.push('gather_user_attributes')
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
  async submitApartmentAttributes (context, attributes) {
    try {
      let resp = await API.post('account_attributesCRUD', '/account_attributes', {body: attributes})
      return resp
    } catch (err) {
      throw err
    }
  }
}
