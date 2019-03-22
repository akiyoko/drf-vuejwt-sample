<template>
  <div id="login-page">
    <Header/>
    <Messages/>

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
  import userService from '@/services/userService'
  import Header from '@/components/Header.vue'
  import Messages from '@/components/Messages.vue'
  import Debug from '@/components/Debug.vue'

  export default {
    components: {
      Header,
      Messages,
      Debug
    },
    data () {
      return {
        username: '',
        password: '',
        error: null
      }
    },
    methods: {
      login: function () {
        this.$store.commit('message/clearMessage')
        console.log('444')
        userService.login(this.username, this.password)
          .then(user => {
            console.log('555')
            this.$store.commit('message/setMessage', { info: 'ログインしました。' })
            const next = this.$route.query.next || '/'
            this.$router.replace(next)
            console.log('LoginPage ... login() ... user=', user)
            console.log('Login success!!')
          })
        // .catch(error => {
        //   console.log('LoginPage error!!!!!!! error=', error)
        //   const status = error.response ? error.response.status : null
        //   if (status === 400) {
        //     // this.messages.warnings = Object.entries(error.response.data)
        //     const warnings = Object.entries(error.response.data)
        //     this.$store.commit('message/setMessage', { warnings: warnings })
        //   } else {
        //     // this.messages.error = error.statusText
        //     this.$store.commit('message/setMessage', { error: error.statusText })
        //   }
        // })
      }
    }
  }
</script>

<style scoped>
</style>
