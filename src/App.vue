<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
        </a>
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
        <!-- TODO: change this to use the name instead of path. -->
        <navbar-user-button @loginClicked="$router.push('/login')" />
      </div>
    </nav>
    <b-modal :active.sync="isLoginModalOpen" has-modal-card>
      <modal-login-form></modal-login-form>
    </b-modal>
    <router-view/>
  </div>
</template>

<script>
import ModalLoginForm from './components/ModalLoginForm.vue'
import NavbarUserButton from './components/NavbarUserButton.vue'

export default {
  components: {
    ModalLoginForm,
    NavbarUserButton
  },
  data () {
    return {
      isLoginModalOpen: false
    }
  }
}
</script>

<style lang="scss">
@import '~bulma';
@import '~buefy/src/scss/buefy';
</style>
