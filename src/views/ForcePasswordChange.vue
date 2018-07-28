<template>
  <div>
    <section class="hero is-warning is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Password Reset Required
          </h1>
          <h2 class="subtitle">
            Your password needs to be reset!
          </h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <article class="box is-child notification is-info">
          <p class="title">Change password</p>
          <p class="subtitle">Make it secure!</p>
          <div class="content">
            <form class="box is-white" @submit.prevent="submit()">
              <b-field label="New Password Confirm">
                <b-input expanded v-model="pass" type="password"></b-input>
              </b-field>
              <b-field label="New Password">
                <b-input v-model="passConfirm" type="password"></b-input>
              </b-field>
              <b-field label="Full Name">
                <b-input v-model="name" type="text"></b-input>
              </b-field>
              <button class="button is-info">
                <span class="icon">
                  <i class="fas fa-user"></i>
                </span>
                <span>Submit Password Change</span>
              </button>
            </form>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
<script>
import { Auth } from 'aws-amplify'

export default {
  data () {
    return {
      pass: '',
      passConfirm: '',
      name: ''
    }
  },
  methods: {
    submit () {
      Auth.completeNewPassword(
        this.$store.state.user,
        this.pass,
        { name: this.name })
        .then(resp => {
          console.log(resp)
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
