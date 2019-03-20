<template>
  <div class="home">
    <img @click="test()" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src

import {Auth} from 'aws-amplify'
export default {
  name: 'home',
  components: {
  },
  methods: {
    async test () {
      console.log(Auth.currentAuthenticatedUser())
      console.log('resolved')
    }
  }
}
</script>
