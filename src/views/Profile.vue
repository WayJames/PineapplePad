<template>
  <div>
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            User Profile
          </h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="tile is-ancestor">
          <div class="tile is-vertical is-8">
            <div class="tile">
              <div class="tile is-parent is-vertical">
                <article class="tile is-child notification is-primary">
                  <p class="title">Ask for help</p>
                  <p class="subtitle">It's ok!</p>
                </article>
                <article class="tile is-child notification is-warning">
                  <change-password-component v-bind="changePass.errorState" @submit="submitChangePassword" />
                </article>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child notification is-info">
                  <p class="title">Your Info</p>
                  <p class="subtitle">Your personal stuff.</p>

                </article>
              </div>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child notification is-link">
                <p class="title">Apartment Info</p>
                <p class="subtitle">Where do you want to live?</p>
                <div class="content">
                  <!-- Content -->
                </div>
              </article>
            </div>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-success">
              <p class="title">Apartment Info</p>
              <p class="subtitle">Where do you want to live?</p>
              <div class="content">
                <!-- Content -->
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import ChangePasswordComponent from '../components/profile/ChangePassword.vue'
export default {
  components: {
    ChangePasswordComponent
  },
  data () {
    return {
      changePass: {
        old: '',
        new: '',
        newConfirm: '',
        errorState: {
          displayError: false,
          errorMessage: ''
        }
      }
    }
  },
  methods: {
    submitChangePassword (data) {
      console.log(data)
      this.$store.dispatch('changePassword', { oldPass: data.oldPass, newPass: data.newPass })
        .then(resp => {
          this.$snackbar.open('Password change successful!')
        }).catch(err => {
          console.log(err)
          this.changePass.errorState.displayError = true
          this.changePass.errorState.errorMessage = err.message
        })
    }
  }
}
</script>
