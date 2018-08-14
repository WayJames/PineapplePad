<template lang="pug">
  div
    b-modal(:active.sync="isVerifyEmailModalActive")
      verify-email-modal
    p.title Your Info
    p.subtitle Personal data
    .content
      b-notification(type='is-danger', :active.sync='displayError')
        | {{errorMessage}}
      form.box.is-white(@submit.prevent='submit()')
        b-field(label='Name')
          b-input(v-model='attributes.name', placeholder="Your full name." type='text', required)
        b-field(label='Phone Number')
          b-input(v-model='attributes.phone_number', type='text', required)
        b-field(label='Email')
          b-input(v-model='attributes.email', type='text', required)
        .level
          .level-left
            .level-item
              button.button.is-warning(v-bind:class="{ 'is-loading': buttonLoading }", :disabled='!formValid')
                span.icon
                  i.fas.fa-user
                span Submit Changes
          .level-right
            .level-item
              a(@click="isVerifyEmailModalActive = true") Verify Email
</template>

<script>
import VerifyEmailModal from './VerifyEmailModal.vue'

export default {
  data () {
    return {
      attributes: {
        name: '',
        phone_number: '',
        email: ''
      },
      buttonLoading: false,
      loading: false,
      displayError: false,
      errorMessage: '',
      isVerifyEmailModalActive: false
    }
  },
  mounted () {
    this.loading = true
    this.$store.dispatch('updateUser').then(usr => {
      this.attributes = this.$store.state.user.attributes
      this.loading = false
    })
  },
  computed: {
    formValid () {
      return this.attributes.name && this.attributes.phone_number
    }
  },
  methods: {
    submit () {
      if (!this.attributes.phone_number.startsWith('+1')) {
        this.attributes.phone_number = `+1${this.attributes.phone_number}`
      }
      this.buttonLoading = true
      this.$store.dispatch('updateUserAttributes', this.attributes).then((resp) => {
        this.buttonLoading = false
        if (resp.verified.email) {
          this.$snackbar.open('Personal data saved!')
        } else {
          this.$snackbar.open({
            message: 'Please verify your email address!',
            actionText: 'Verify Email',
            indefinite: true,
            queue: false,
            onAction: () => {
              this.isVerifyEmailModalActive = true
            }
          })
        }
      }).catch(err => {
        this.displayError = true
        this.errorMessage = err.message
        this.$snackbar.open('An error occurred.')
        this.buttonLoading = false
      })
    }
  },
  components: {
    VerifyEmailModal
  }
}
</script>
