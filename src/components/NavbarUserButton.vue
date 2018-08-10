<template>
  <div class="navbar-end">
    <div class="navbar-menu">
      <div v-if="!user" class="navbar-item">
        <a @click="$emit('loginClicked')" class="button is-primary">
          <span class="icon">
            <i class="fas fa-user"></i>
          </span>
          <span>Login/Sign up</span>
        </a>
      </div>
      <div v-if="!!user" class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          Hey there, {{user.username}}
        </a>
        <div class="navbar-dropdown is-right is-boxed">
          <router-link class="navbar-item" :to="{name: 'profile'}">
            Edit Account Settings
          </router-link>
          <a class="navbar-item" @click="$store.dispatch('signOut')">
            Sign Out
          </a>
        </div>
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
