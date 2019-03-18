<template>
  <div id="login-page">
    <Header :user="user"/>

    <b-form @submit="onSubmit">
      <b-form-group>
        <b-form-input v-model="username" type="text" placeholder="Username" required/>
      </b-form-group>

      <b-form-group :invalid-feedback="invalidFeedback">
        <b-form-input v-model="password" type="password" placeholder="Password" required/>
      </b-form-group>

      <div class="text-center">
        <b-button type="submit" variant="primary" block>Login</b-button>
        <b-button variant="link" @click="">Signup</b-button>
      </div>
    </b-form>

    <button class="btn btn-primary" v-on:click="login">ログイン</button>
    <button v-on:click="refresh">リフレッシュ</button>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'

  const axios = require('axios');

  // APIクライアント
  const client = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    responseType: 'json'
  });
  client.interceptors.request.use(config => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = 'JWT ' + token;
      return config;
    }
    return config;
  }, function (error) {
    return Promise.reject(error)
  });

  export default {
    name: 'LoginPage',
    components: {
      Header
    },
    props: {
      user: {
        type: Object
      }
    },
    data() {
      return {
        username: '',
        password: '',
        invalidFeedback: ''
      }
    },
    methods: {
      onSubmit() {
        if (this.username !== '' && this.password !== '') {
          if (this.username === this.$parent.mockAccount.username && this.password === this.$parent.mockAccount.password) {
            this.$emit('user.isAuthenticated', true);
            //this.$router.replace({name: 'secure'});
            console.log("Login success!!");
          } else {
            console.log("The username and / or password is incorrect");
            this.invalidFeedback = 'Incorrect username or password'
          }
        } else {
          console.log("A username and password must be present");
        }
      },
      login: function () {
        client.post('/auth/jwt/create/', {
          'username': this.username,
          'password': this.password
        }).then(response => {
          console.log('Login Success!!');
          localStorage.setItem('access', response.data.access);
          localStorage.setItem('refresh', response.data.refresh);
          this.response = response;

          client.post('/auth/users/create/', {
            'username': this.username,
            'password': this.password
          }).then(response => {
            //TODO
            this.$parent.$parent.$emit('setUser', response.data.user);
          })
        }).catch(error => {
          console.log('Login Fail!!');
          this.response = error.response;
          //this.errors = Object.entries(error.response.data);
          //this.showAlert = true;
        })
      },
      refresh: function () {
        api.post('/auth/jwt/refresh/', {
          'refresh': localStorage.getItem('refresh')
        })
          .then(response => {
            console.log('Success!!');
            localStorage.setItem('access', response.data.access);
            this.response = response;
          })
          .catch(error => {
            console.log('Fail!!');
            this.response = error.response;
          })
      }
    }
  }
</script>

<style scoped>
  #login {
    width: 500px;
    border: 1px solid #cccccc;
    background-color: #ffffff;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
  }
</style>
