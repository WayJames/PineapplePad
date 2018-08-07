<template>
  <div>
    <p class="title">Change password</p>
    <p class="subtitle">Make it secure!</p>
    <div class="content">
      <b-notification type="is-danger" :active.sync="displayError">
        {{errorMessage}}
      </b-notification>
      <form class="box is-white" @submit.prevent="submit()">
        <b-field label="Old Password">
          <b-input v-model="oldPass" type="password" required></b-input>
        </b-field>
        <b-field label="New Password">
          <b-input v-model="newPass" type="password" required></b-input>
        </b-field>
        <b-field :message="passwordsMatch ? null : 'Passwords must match.'" :type="passwordsMatch ? null : 'is-danger'" label="New Password Confirm">
          <b-input v-model="newConfirm" type="password" required></b-input>
        </b-field>
        <button :disabled="!formValid" class="button is-warning">
          <span class="icon">
            <i class="fas fa-user"></i>
          </span>
          <span>Submit Password Change</span>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  props: ['displayError', 'errorMessage'],
  data () {
    return {
      form: {},
      oldPass: '',
      newPass: '',
      newConfirm: ''
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
      this.$emit('submit', { newPass: this.newPass, oldPass: this.oldPass })
    }
  }
}
</script>
