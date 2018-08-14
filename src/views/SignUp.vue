<template>
  <div>
    <section class="hero ">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Sign up to find
            <i>your</i> perfect pad.
          </h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="box column is-two-thirds is-offset-one-third">
              <b-notification :active.sync="errorMessageDisplay" type="is-danger">
                {{errorMessage}}
              </b-notification>
            <form @submit.prevent="submit()" class="columns is-multiline">
              <div class="column is-4">
                <label class="label ">Username</label>
                <b-input type="username" v-model="username" required />
              </div>
              <div class="column is-4">
                <label class="label ">Password</label>
                <b-input password-reveal type="password" v-model="password" required />
              </div>
              <div class="column is-4">
                <label class="label ">First and Last name</label>
                <b-input type="text" v-model="attributes.name" required />
              </div>
              <div class="column is-half">
                <label class="label ">Email Address</label>
                <b-input type="email" v-model="attributes.email" required />
              </div>
              <div class="column is-half">
                <label class="label ">Phone Number</label>
                <b-input type="text" v-model="attributes.phone_number" required />
              </div>
              <div class="column is-half is-offset-one-quarter">
                <button v-bind:class="{ 'is-loading': loading }" class="button is-medium is-fullwidth is-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data () {
    return {
      errorMessage: '',
      errorMessageDisplay: false,
      loading: false,
      attributes: {
        email: '',
        phone_number: '',
        name: ''
      },
      username: '',
      password: ''
    }
  },
  methods: {
    submit () {
      this.loading = true
      if (!this.attributes.phone_number.startsWith('+1')) {
        this.attributes.phone_number = `+1${this.attributes.phone_number}`
      }
      var args = { attributes: this.attributes, username: this.username, password: this.password }
      this.$store.dispatch('signUp', args)
        .then((resp) => {
          this.$snackbar.open('Account registered successfully. Please verify your email address.')
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          this.errorMessage = err.message
          this.errorMessageDisplay = true
        })
    }

  }
}
</script>
