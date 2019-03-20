import { get } from 'lodash'

export default {
  userSignedIn (state) {
    return state.user != null
  },
  userFullName (state) {
    return get(state, 'user.attributes.name', 'Not signed in.')
  }
}
