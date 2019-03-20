import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage, meta: { requiresAuth: true } },
    { path: '/login', component: LoginPage },
    //{ path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } },
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth
  const loggedIn = store.getters.loggedIn
  console.log('router... to.path=', to.path)
  console.log('router... requiresAuth=', requiresAuth)
  console.log('router... loggedIn=', loggedIn)
  if (requiresAuth && !loggedIn) {
    console.log('Force user to login page!!')
    next({
      path: '/login',
      query: { next: to.fullPath }
    })
  }

  console.log('Go to next.')
  next()
})

export default router
