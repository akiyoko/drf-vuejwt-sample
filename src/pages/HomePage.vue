<template>
  <div id="home-page">
    <Header/>

    <main class="container">
      <p class="h5 mb-4">ホーム</p>
      <b-form @submit.prevent="saveBook">
        <div class="row form-group">
          <label class="col-sm-3 col-form-label">タイトル</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" v-model="book.title">
          </div>
        </div>
        <div class="row form-group">
          <label class="col-sm-3 col-form-label">価格</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" v-model="book.price">
          </div>
        </div>
        <div class="row text-center mt-5">
          <div class="col-sm-12">
            <b-button type="submit" variant="primary">{{ isCreated ? '更新' : '登録' }}</b-button>
          </div>
        </div>
      </b-form>
    </main>

    <!-- For debug -->
    <debug :data="$data">HomePage</debug>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import Debug from '@/components/Debug.vue'
  import api from '@/services/api'

  export default {
    components: {
      Header,
      Debug
    },
    data: function () {
      return {
        book: {
          price: 0
        },
        showAlert: false,
        errors: []
      }
    },
    computed: {
      isCreated: function () {
        return this.book.id !== undefined
      }
    },
    methods: {
      saveBook: function () {
        this.showAlert = false
        this.errors = []
        api({
          method: this.isCreated ? 'put' : 'post',
          url: this.isCreated ? '/books/' + this.book.id + '/' : '/books/',
          data: {
            'id': this.book.id,
            'title': this.book.title,
            'price': this.book.price
          }
        }).then(response => {
          this.book = response.data
          this.errors = []
        }).catch(error => {
          this.errors = Object.entries(error.response.data)
          this.showAlert = true
        })
      }
    }
  }
</script>

<style scoped>
</style>
