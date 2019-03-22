<template>
  <div id="header">
    <b-navbar type="dark" variant="dark">
      <a class="navbar-brand" href="/">
        <img src="@/assets/images/logo.png" width="120">
      </a>
      <b-navbar-nav class="ml-auto" v-if="$route.meta.requiresAuth">
        <b-nav-item-dropdown right v-if="$store.state.user.loggedIn">
          <template slot="button-content">{{ $store.state.user.username }}</template>
          <b-dropdown-item href="#" @click="logout">ログアウト</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
  import userService from '@/services/userService'

  export default {
    methods: {
      logout: function () {
        userService.logout()
        this.$store.commit('message/setMessage', { info: 'ログアウトしました。' })
        this.$router.replace('/login')
      }
    }
  }
</script>

<style scoped>
</style>
