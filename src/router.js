import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import userService from '@/services/userService'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage, meta: { requiresAuth: true } },
    { path: '/login', component: LoginPage },
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('to.path=', to.path)
  const requiresAuth = to.meta.requiresAuth
  const loggedIn = store.getters.loggedIn

  // 未ログイン状態でログインが必要な画面に遷移しようとした場合、ログイン画面へ
  if (requiresAuth && !loggedIn) {
    const token = localStorage.getItem('access')
    if (token != null) {
      console.log('router... token is not null')
      userService.getUser()
        .then(() => {
          next()
        })
    }
    console.log('Force to login page.')
    next({
      path: '/login',
      query: { next: to.fullPath }
    })
  }

  // ログイン状態でログイン画面に遷移しようとした場合、強制ログアウト
  if (to.path === '/login' && loggedIn) {
    console.log('Force logout.')
    userService.logout()
  }

  console.log('Next.')
  next()
})

export default router
