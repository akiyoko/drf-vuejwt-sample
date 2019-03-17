<template>
  <div id="login-form">
    <button @click="login">ログイン</button>
    <button @click="refresh">リフレッシュ</button>
    <button @click="logout">ログアウト</button>
  </div>
</template>

<script>
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
    name: 'LoginForm',
    methods: {
      login: function () {
        console.log('login!!');
        client.post('/auth/jwt/create/', {
          'username': 'admin',
          'password': 'pass12345'
        })
          .then(response => {
            console.log('Success!!');
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            this.$emit('user.isAuthenticated', true);
            this.response = response;
          })
          .catch(error => {
            console.log('Fail!!');
            this.response = error.response;
          })
      },
      logout: function () {
        console.log("LoginForm....logout!!");
        this.$emit('logout');
        //this.$parent.$parent.logout();
      },
      refresh: function () {
        client.post('/auth/jwt/refresh/', {
          'refresh': localStorage.getItem('refresh')
        })
          .then(response => {
            //console.log('Success!!');
            localStorage.setItem('access', response.data.access);
            this.response = response;
          })
          .catch(error => {
            //console.log('Fail!!');
            this.response = error.response;
          })
      }
    }
  }
</script>

<style scoped>
</style>
