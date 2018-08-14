<template lang="pug">
form.modal-card(@submit.prevent="submit()")
  header.modal-card-head
    p.modal-card-title Verify Email
  section.modal-card-body
    b-notification(type='is-danger', :active.sync='displayError') {{errorMessage}}
    b-field(label="Verification Code")
      b-input(type="text", v-model="verificationCode" required)
  footer.modal-card-foot
    button.button.is-primary(type="submit") Submit
    //- button.button(@click="$parent.close()") Close
</template>
<script>
export default {
  data () {
    return {
      verificationCode: '',
      errorMessage: '',
      displayError: false
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('verifyEmailAddress', {code: this.verificationCode}).then((resp) => {
        console.log(resp)
        this.$parent.close()
      }).catch(err => {
        console.log(err.message)
        this.errorMessage = err.message
        this.displayError = true
      })
    }
  }
}
</script>
