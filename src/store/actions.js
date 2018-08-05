import { Auth, API } from 'aws-amplify'

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
  async signUp (context, {username, password, attributes}) {
    try {
      let user = await Auth.signUp({
        username,
        password,
        attributes: attributes.cognito
      })
      await API.post('account_attributesCRUD', '/account_attributes', {body: attributes.db})
      return user
    } catch (err) {
      throw err
    }
  }
}
