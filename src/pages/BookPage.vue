<template>
  <div id="book-page">
    <Header :user="user"/>

    <main class="container">
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">タイトル</label>
        <div class="col-sm-5">
          <input type="text" class="form-control" v-model="book.title">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">価格</label>
        <div class="col-sm-5">
          <input type="text" class="form-control" v-model="book.price">
        </div>
      </div>
      <div class="col-sm-9 row">
        <b-button @click="saveBook" variant="info">
          {{ isCreated ? '更新' : '登録' }}
        </b-button>
      </div>

      <!-- For debug -->
      <pre style="margin-top: 50px;">{{ $data }}</pre>
    </main>

    <LoginForm @logout="logout"/>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import LoginForm from '@/components/LoginForm.vue'

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
    name: 'BookPage',
    components: {
      Header,
      LoginForm
    },
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    data: function () {
      return {
        book: {
          price: 0
        },
        response: null,
        showAlert: false,
        errors: []
      }
    },
    computed: {
      isCreated: function () {
        return this.book.id !== undefined;
      }
    },
    methods: {
      saveBook: function () {
        this.showAlert = false;
        client({
          method: this.isCreated ? 'put' : 'post',
          url: this.isCreated ? '/books/' + this.book.id + '/' : '/books/',
          data: {
            'id': this.book.id,
            'title': this.book.title,
            'price': this.book.price
          }
        })
          .then(response => {
            this.book = response.data;
            this.response = response;
          })
          .catch(error => {
            this.response = error.response;
            this.errors = Object.entries(error.response.data);
            this.showAlert = true;
          })
      },
      logout: function () {
        console.log("BookPage....logout!!");
        this.$emit('logout');
      },
    }
  }
</script>

<style scoped>
  #book-page > main {
    margin-top: 4em;
  }
</style>
