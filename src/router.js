import Vue from 'vue'
import VueRouter from 'vue-router'
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
  console.log('to.meta.requiresAuth=', to.meta.requiresAuth)

  // 未ログイン状態でログインが必要な画面に遷移しようとした場合、ログイン画面へ
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('access')
    if (token == null) {
      console.log('JWT is not found. So, force to login page.')
      next({
        path: '/login',
        query: { next: to.fullPath }
      })
    }
  }

  // ログイン状態でログイン画面に遷移しようとした場合、強制ログアウト
  if (to.path === '/login') {
    console.log('Force user to logout.')
    userService.logout()
  }

  console.log('Next.')
  next()
})

export default router
