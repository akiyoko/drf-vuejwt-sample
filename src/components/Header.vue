<template>
  <div id="header">
    <b-navbar type="dark" variant="dark">
      <a class="navbar-brand" href="/">
        <img src="@/assets/images/logo.png" width="120">
      </a>
      <b-navbar-nav class="ml-auto" v-if="showLink">
        <b-nav-item-dropdown right v-if="user.loggedIn">
          <template slot="button-content">{{ user.username }}</template>
          <b-dropdown-item href="#" @click="$emit('logout')">Logout</b-dropdown-item>
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
    props: {
      user: {
        type: Object
      },
      showLink: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped>
</style>
