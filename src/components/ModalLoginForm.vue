<template>
  <form @submit.prevent="submitLogin()">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Email">
          <b-input type="username" v-model="username" placeholder="Your email" required>
          </b-input>
        </b-field>
        <b-field v-if="pwReset" label="Reset Code">
          <b-input type="password" v-model="resetCode" password-reveal placeholder="Your reset code" required>
          </b-input>
        </b-field>
        <b-field :label="pwReset ? 'New Password' : 'Password'">
          <b-input type="password" v-model="password" password-reveal placeholder="Your password" required>
          </b-input>
        </b-field>
        <b-tooltip :label="forgotPassErr" :active="!!forgotPassErr" always type="is-danger">
          <a @click="forgotPassword()">Forgot password?</a>
        </b-tooltip>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <b-tooltip :label="errorMessage" :active="!!errorMessage" always type="is-danger">
          <button class="button is-primary">Login</button>
        </b-tooltip>
      </footer>
    </div>
  </form>
</template>
<script>
export default {
  data () {
    return {
      pwReset: false,
      errorMessage: '',
      forgotPassErr: '',
      username: 'daniel.heppner1@gmail.com',
      password: 'Jf>YWanq'
    }
  },
  methods: {
    submitLogin () {
      this.$store.dispatch('signIn', {
        username: this.username,
        password: this.password
      }).then(usr => {
        console.log(usr)
        // this.$router.push({ name: 'dashboard' })
        this.$parent.close()
        if (usr.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.$router.push({ name: 'force_password_change' })
        }
      }).catch(err => {
        this.errorMessage = err.message
      })
    },
    forgotPassword () {
      if (this.username) {
        this.$store.dispatch('forgotPassword', {
          username: this.username
        }).then(() => {
          this.$snackbar.open('Please check your email for a password reset code!')
        }).catch((err) => {
          this.$snackbar.open({
            message: err.message,
            type: 'is-warning',
            position: 'is-top',
            indefinite: true
          })
        })
      } else {
        this.forgotPassErr = 'Please enter a username.'
      }
    }
  }
}
</script>
