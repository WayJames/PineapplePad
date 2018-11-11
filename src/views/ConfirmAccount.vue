<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <article class="is-child notification is-info column is-4 is-offset-4">
          <form @submit.prevent="submit()">
            <div class="notification is-white">
              <b-notification type="is-danger" :active.sync="displayErrorMessage">
                {{errorMessage}}
              </b-notification>
              <b-field label="Username">
                <b-input type="username" v-model="username" placeholder="Username" required>
                </b-input>
              </b-field>
              <b-field label="Code Received">
                <b-input type="password" v-model="code" placeholder="Verification Code" required>
                </b-input>
              </b-field>
              <button v-bind:class="{ 'is-loading': loading }" class="button is-primary">Submit</button>
              <a @click="resend()" v-bind:class="{ 'is-loading': loading }" class="button is-primary">Resend Verification</a>
            </div>
          </form>
        </article>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      displayErrorMessage: false,
      errorMessage: '',
      code: '',
      username: this.$route.params.username,
      loading: false
    }
  },
  methods: {
    submit () {
      this.loading = true
      this.$store.dispatch('submitVerificationCode', {
        username: this.username,
        code: this.code
      }).then((resp) => {
        this.loading = false
        this.$snackbar.open('Account verified successfully!')
      }).catch(err => {
        this.loading = false
        this.errorMessage = err.message
        this.displayErrorMessage = true
      })
    },
    resend () {
      this.loading = true
      this.$store.dispatch('resendVerificationCode', {
        username: 'daniel.heppner1@gmail.com'
      }).then((resp) => {
        this.loading = false
        this.$snackbar.open('Resent verification code.')
      }).catch(err => {
        this.loading = false
        console.log(err)
        this.errorMessage = err.message
        this.displayErrorMessage = true
      })
    }
  }
}
</script>
