<template lang="pug">
  div
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
        button.button.is-warning(v-bind:class="{ 'is-loading': buttonLoading }", :disabled='!formValid')
          span.icon
            i.fas.fa-user
          span Submit Changes
</template>

<script>
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
      errorMessage: ''
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
      this.$store.dispatch('updateUserAttributes', this.attributes).then(() => {
        this.buttonLoading = false
        this.$snackbar.open('Personal data saved!')
      }).catch(err => {
        this.displayError = true
        this.errorMessage = err.message
        this.$snackbar.open('An error occurred.')
        this.buttonLoading = false
      })
    }
  }
}
</script>
