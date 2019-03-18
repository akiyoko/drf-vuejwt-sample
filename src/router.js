import Vue from 'vue'
import VueRouter from 'vue-router'
import BookPage from '@/pages/BookPage'
import LoginPage from '@/pages/LoginPage'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: BookPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
})
