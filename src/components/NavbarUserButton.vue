<template>
  <div class="navbar-menu is-active">
    <div v-if="!user" class="navbar-item">
      <a @click="$emit('loginClicked')" class="button is-primary">
        <span class="icon">
          <i class="fas fa-user"></i>
        </span>
        <span>Login/Sign up</span>
      </a>
    </div>
    <div v-if="!!user" class="navbar-item has-dropdown is-hoverable">
      <router-link
        :to="{name: 'dashboard'}"
        class="navbar-link"
      >Hey there, {{user.attributes.name}}!</router-link>
      <div class="navbar-dropdown is-right is-boxed">
        <router-link class="navbar-item" :to="{name: 'profile'}">Edit Account Settings</router-link>
        <a class="navbar-item" @click="$store.dispatch('signOut')">Sign Out</a>
        <a class="navbar-item" @click="$store.dispatch('getApartments')">get apartments</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState([
    'user'
  ])
}
</script>
