<template>
  <div id="app">
    <router-view :user="user"/>

    <!-- For debug -->
    <pre style="margin-top: 50px;">{{ $data }}</pre>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      user: {
        isAuthenticated: false,
        username: ''
      }
    }
  },
  /*
  mounted() {
    if (!this.isAuthenticated) {
      this.$router.replace({name: "login"});
    }
  },
  */
  methods: {
    /*
    setAuthenticated(status) {
      console.log('setAuthenticated!!!')
      this.user.isAuthenticated = status;
    },
    */
    setUser(user) {
      console.log('setUser!!!')
      this.user = user;
    },
    logout() {
      this.user.isAuthenticated = false;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
