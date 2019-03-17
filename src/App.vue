<template>
  <div id="app">
    <BookPage :user="user" @logout="logout"/>

    <!-- For debug -->
    <pre style="margin-top: 50px;">{{ $data }}</pre>
  </div>
</template>

<script>
import BookPage from './pages/BookPage.vue'

export default {
  name: 'app',
  components: {
    BookPage
  },
  data() {
    return {
      user: {
        isAuthenticated: true,
        username: 'hoge'
      },
      mockAccount: {
        username: 'admin',
        password: 'pass'
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
    setAuthenticated(status) {
      console.log('setAuthenticated!!!')
      this.user.isAuthenticated = status;
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
  //text-align: center;
  color: #2c3e50;
  //margin-top: 60px;
}
</style>
