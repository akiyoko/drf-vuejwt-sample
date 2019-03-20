<template>
  <div id="header">
    <b-navbar type="dark" variant="dark">
      <a class="navbar-brand" href="/">
        <img src="@/assets/images/logo.png" width="120">
      </a>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right v-if="$route.meta.requiresAuth && user.loggedIn">
          <template slot="button-content">{{ user.username }}</template>
          <b-dropdown-item href="#" @click="$emit('logout')">ログアウト</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    props: {
      user: {
        type: Object
      }
    }
  }
</script>

<style scoped>
</style>
