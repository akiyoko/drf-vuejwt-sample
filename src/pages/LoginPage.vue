<template>
  <div id="login-page">
    <Header/>

    <b-alert variant="danger" show v-show="errors.length > 0">
      <ul>
        <li v-for="(v, k) in errors">{{ v }}: {{ k }}</li>
      </ul>
    </b-alert>

    <main class="container">
      <p class="h5 mb-4">ログイン</p>
      <b-form @submit.prevent="login">
        <div class="row form-group">
          <label class="col-sm-3 col-form-label">ユーザー名</label>
          <div class="col-sm-8">
            <b-form-input type="text" v-model="username" required/>
          </div>
        </div>
        <div class="row form-group">
          <label class="col-sm-3 col-form-label">パスワード</label>
          <div class="col-sm-8">
            <b-form-input type="password" v-model="password" required/>
          </div>
        </div>
        <div class="row text-center mt-5">
          <div class="col-sm-12">
            <b-button type="submit" variant="primary">ログイン</b-button>
          </div>
        </div>
      </b-form>
    </main>

    <!-- For debug -->
    <debug :data="$data">LoginPage</debug>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import Debug from '@/components/Debug.vue'
  import userService from '@/services/userService'

  export default {
    components: {
      Header,
      Debug
    },
    data () {
      return {
        username: '',
        password: '',
        errors: []
      }
    },
    methods: {
      login: function () {
        userService.login(this.username, this.password)
          .then(user => {
            const next = this.$route.query.next || '/'
            this.$router.replace(next)
            console.log('LoginPage ... login() ... user=', user)
            console.log('Login success!!')
          }).catch(error => {
          console.log('Login error!!!!!!!')
          this.errors = Object.entries(error.response.data)
        })
      }
    }
  }
</script>

<style scoped>
</style>
