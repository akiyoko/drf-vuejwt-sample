<template>
  <div id="app" v-cloak>
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

export default {
  name: 'BookForm',
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
    isCreated: function() {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
