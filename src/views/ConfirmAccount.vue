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
      username: '',
      loading: false
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('submitVerificationCode', {
        username: this.username,
        code: this.code
      }).then((resp) => {
      }).catch(err => {
        this.errorMessage = err.message
        this.displayErrorMessage = true
      })
    }
  }
}
</script>
