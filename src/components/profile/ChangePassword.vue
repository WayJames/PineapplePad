<template lang="pug">
  div
    p.title Change password
    p.subtitle Make it secure!
    .content
      b-notification(type='is-danger', :active.sync='displayError')
        | {{errorMessage}}
      form.box.is-white(@submit.prevent='submit()')
        b-field(label='Old Password')
          b-input(v-model='oldPass', type='password', required='')
        b-field(label='New Password')
          b-input(v-model='newPass', type='password', required='')
        b-field(:message="passwordsMatch ? null : 'Passwords must match.'", :type="passwordsMatch ? null : 'is-danger'", label='New Password Confirm')
          b-input(v-model='newConfirm', type='password', required='')
        button.button.is-warning(:disabled='!formValid')
          span.icon
            i.fas.fa-user
          span Submit Password Change
</template>
<script>
export default {
  data () {
    return {
      form: {},
      oldPass: '',
      newPass: '',
      newConfirm: '',
      displayError: false,
      errorMessage: ''
    }
  },
  computed: {
    fieldsComplete () {
      return this.oldPass.length && this.newPass.length && this.newConfirm.length
    },
    passwordsMatch () {
      return this.newPass === this.newConfirm
    },
    formValid () {
      return this.fieldsComplete && this.passwordsMatch
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('changePassword', { oldPass: this.oldPass, newPass: this.newPass })
        .then(resp => {
          this.$snackbar.open('Password change successful!')
        }).catch(err => {
          this.displayError = true
          this.errorMessage = err.message
        })
    }
  }
}
</script>
