import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import HomePage from '@/pages/HomePage'
import DashboardPage from '@/pages/DashboardPage'
import LoginPage from '@/pages/LoginPage'
import userService from '@/services/userService'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  // ログインが必要な画面には「requiresAuth」フラグを付けておく
  routes: [
    { path: '/', component: HomePage, meta: { requiresAuth: true } },
    { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } },
    { path: '/login', component: LoginPage },
    { path: '*', redirect: '/' }
  ]
})

// routerで画面遷移する直前に実行される
router.beforeEach((to, from, next) => {
  console.log('to.path=', to.path)
  console.log('store=', store)
  console.log('store.getters=', store.getters)
  console.log('store.getters[\'loggedIn\']=', store.getters['loggedIn'])
  console.log('store.getters.loggedIn=', store.getters.loggedIn)
  console.log('store.state=', store.state)
  console.log('store.state.user=', store.state.user)
  console.log('store.state.user.loggedIn=', store.state.user.loggedIn)
  const requiresAuth = to.meta.requiresAuth
  const loggedIn = store.state.user.loggedIn
  console.log('requiresAuth=', requiresAuth)
  console.log('loggedIn=', loggedIn)

  // 未ログイン状態でログインが必要な画面に遷移しようとした場合、ログイン画面へ
  if (requiresAuth && !loggedIn) {
    const token = localStorage.getItem('access')
    if (token != null) {
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
  // router内では正確な状態が取得できない？
  // if (to.path === '/login') {
  if (to.path === '/login' && loggedIn) {
    console.log('Force logout.')
    userService.logout()
  }

  console.log('Next.')
  next()
})

export default router
