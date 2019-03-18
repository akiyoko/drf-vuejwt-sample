<template>
  <div id="header">
    <b-navbar type="dark" variant="dark">
      <a class="navbar-brand" href="/">
        <img src="@/assets/images/logo.png" width="120">
      </a>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right v-if="user.isAuthenticated">
          <template slot="button-content">{{ user.username }}</template>
          <b-dropdown-item href="#" @click="$parent.$parent.$emit('logout')">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-navbar-nav v-else>
          <b-nav-item href="#" @click="$router.push('/login')">Login</b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    props: {
      user: {
        type: Object
      }
    }
  }
</script>

<style scoped>
</style>
