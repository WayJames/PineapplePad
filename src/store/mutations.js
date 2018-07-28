export default {
  setUser (state, user) {
    state.user = user
    if (user == null) {
      state.transactionData = []
    }
  }
}
