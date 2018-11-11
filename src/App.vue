<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
        </router-link>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">How it works</router-link>
          <router-link to="/" class="navbar-item">What they say</router-link>
          <router-link to="/" class="navbar-item">Apartment ratings</router-link>
        </div>
        <navbar-user-button @loginClicked="$router.push({name: 'login'})" />
      </div>
    </nav>
    <nav v-if="displayApartmentPrefsWarning" class="navbar is-danger is-fixed-bottom" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <div class="navbar-item">It looks like never got your apartment preferences! Help us help you by telling us what you're looking for.</div>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <router-link :to="{name: 'gather_user_data'}" class="button is-warning">Go to the form now!</router-link>
          </div>
        </div>
      </div>
    </nav>
    <b-modal :active.sync="isLoginModalOpen" has-modal-card>
      <modal-login-form></modal-login-form>
    </b-modal>
    <router-view/>
  </div>
</template>

<script>
import ModalLoginForm from '@/components/ModalLoginForm.vue'
import NavbarUserButton from '@/components/NavbarUserButton.vue'
import store from '@/store'

export default {
  components: {
    ModalLoginForm,
    NavbarUserButton
  },
  data () {
    return {
      isLoginModalOpen: false
    }
  },
  computed: {
    displayApartmentPrefsWarning () {
      if (this.$route.name !== 'gather_user_data') {
        return store.state.displayApartmentPrefsWarning
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
@import '~bulma';
@import '~buefy/src/scss/buefy';
</style>
