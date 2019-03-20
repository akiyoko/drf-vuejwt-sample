<template>
  <div id="login-page">
    <Header/>

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
    <div class="container debug">
      <p>LoginPage</p>
      <pre>{{ $data }}</pre>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import userService from '@/services/userService'

  export default {
    components: {
      Header
    },
    props: {
      user: {
        type: Object
      }
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
            // this.$router.replace(next)
            console.log('Login success!!')
          }).catch(error => {
          console.log('Login error!!!!!!!')
          this.errors = error.response
        })
      }
    }
  }
</script>

<style scoped>
</style>
