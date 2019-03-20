<template>
  <div id="app" v-cloak>
    <router-view
      :user="user"
      @set-user="setUser"
      @remove-user="removeUser"
    />

    <!-- For debug -->
    <div class="container debug">
      <p>App</p>
      <pre>{{ $data }}</pre>
    </div>
  </div>
</template>

<script>
  import userService from '@/services/userService'

  export default {
    data () {
      return {
        user: {
          loggedIn: false,
          username: ''
        }
      }
    },
    mounted () {
      if (!this.user.loggedIn) {
        // accessトークンで取得してみる
        userService.getUser()
          .then(user => {
            this.setUser(user)
            console.log('Succeeded to get user by access token!')
            // this.$router.replace('/')
          // }).catch(error => {
          // this.$router.replace('/login')
        })
        // if (!this.user.loggedIn) {
        //   this.$router.replace('/login')
        // }
      }
    },
    methods: {
      setUser (user) {
        console.log('App.vue ... setUser() is called.')
        this.user.loggedIn = true
        this.user.username = user.username
      },
      removeUser () {
        console.log('App.vue ... removeUser() is called.')
        this.user.loggedIn = false
        this.user.username = ''
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

  [v-cloak] {
    display: none;
  }

  main.container {
    border: 1px solid #cccccc;
    margin-top: 4em;
    padding: 2em;
    width: 600px;
  }

  .container.debug {
    margin-top: 2em;
  }
</style>
