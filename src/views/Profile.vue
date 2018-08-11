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
                change-password-component
            .tile.is-parent
              article.tile.is-child.notification.is-info
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
  }
}
</script>
