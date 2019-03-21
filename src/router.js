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
  const requiresAuth = to.meta.requiresAuth
  const loggedIn = store.getters.loggedIn
  console.log('router... to.path=', to.path)
  console.log('router... requiresAuth=', requiresAuth)
  console.log('router... loggedIn=', loggedIn)
  if (requiresAuth) {
    if (loggedIn) {
      console.log('Force user to after login page.')
      //next('/')
    } else {
      const token = localStorage.getItem('access')
      if (token != null) {
        console.log('router... token is not null')
        userService.getUser().then(user => {
          console.log('router... getUser success!!')
          store.dispatch('setUser', { user: user })
          // TODO: ログイン状態で / に遷移するとログイン画面が表示される！？
          next()
        })
      }
      console.log('Force user to login page.')
      next({
        path: '/login',
        query: { next: to.fullPath }
      })
    }
  }

  console.log('Go to next.')
  next()
})

export default router
