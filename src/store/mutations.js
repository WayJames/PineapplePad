export default {
  setUser (state, user) {
    state.user = user
    if (user == null) {
      state.transactionData = []
    }
  },
  storePasswordTemporarily (state, password) {
    state.passwordTemporaryStorage = password
  },
  setApartmentPrefs (state, prefs) {
    state.apartmentPrefs = prefs
  },
  setDisplayApartmentPrefsWarning (state, warningDisplayed) {
    state.displayApartmentPrefsWarning = warningDisplayed
  }
}
