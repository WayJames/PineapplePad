export default {
  setUser (state, user) {
    state.user = user
    if (user == null) {
      state.transactionData = []
    }
  },
  storePasswordTemporarily (state, password) {
    state.passwordTemporaryStorage = password
  }
}
