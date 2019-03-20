<template>
  <div>
    <section class="hero is-warning is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Login
          </h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <article class="is-child notification is-info column is-4 is-offset-4">
            <login-form />
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import LoginForm from '@/components/profile/LoginForm.vue'

export default {
  components: {
    LoginForm
  }
}
</script>
