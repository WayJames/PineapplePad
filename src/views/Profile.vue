<template lang="pug">
div
  section.hero.is-primary.is-bold
    .hero-body
      .container
        h1.title.
          User Profile
  section.section
    .container
      .tile.is-ancestor
        .tile.is-vertical.is-8
          .tile
            .tile.is-parent.is-vertical
              article.tile.is-child.notification.is-primary
                p.title Ask for help
              article.tile.is-child.notification.is-warning
                change-password-component(v-bind='changePass.errorState', @submit='submitChangePassword')
            .tile.is-parent
              article.tile.is-child.notification.is-info
                p.title Your Info
                p.subtitle Your personal stuff.
                user-info-component
          .tile.is-parent
            article.tile.is-child.notification.is-link
              p.title Living Preferences
              p.subtitle Help us help you find a new pad.
              .content
                // Content
        .tile.is-parent
          article.tile.is-child.notification.is-success
            p.title Apartment Info
            p.subtitle Where do you want to live?
            .content
              apartment-prefs-component

</template>
<script>
import ChangePasswordComponent from '@/components/profile/ChangePassword.vue'
import ApartmentPrefsComponent from '@/components/profile/ApartmentPrefs.vue'
import UserInfoComponent from '@/components/profile/UserInfo.vue'
export default {
  components: {
    ChangePasswordComponent,
    ApartmentPrefsComponent,
    UserInfoComponent
  },
  data () {
    return {
      changePass: {
        old: '',
        new: '',
        newConfirm: '',
        errorState: {
          displayError: false,
          errorMessage: ''
        }
      }
    }
  },
  methods: {
    submitChangePassword (data) {
      console.log(data)
      this.$store.dispatch('changePassword', { oldPass: data.oldPass, newPass: data.newPass })
        .then(resp => {
          this.$snackbar.open('Password change successful!')
        }).catch(err => {
          console.log(err)
          this.changePass.errorState.displayError = true
          this.changePass.errorState.errorMessage = err.message
        })
    }
  }
}
</script>
