import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import userService from '@/services/userService'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage, meta: { requiresAuth: true } },
    { path: '/login', component: LoginPage },
    { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } },
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access')
  console.log("beforeEach... token=", token)
  console.log("beforeEach... requiresAuth=", to.meta.requiresAuth)

  //if (to.meta.requiresAuth && !auth.loggedIn()) {
  if (to.meta.requiresAuth && token == null) {
    console.log("Go to login page!!")
    next({
      path: '/login',
      query: { next: to.fullPath }
    })
  }

  console.log("Next..")
  next()
})

/*
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  // http://jasonwatmore.com/post/2018/07/14/vue-vuex-user-registration-and-login-tutorial-example#router-js
  const publicPages = ['/login']
  const loginRequired = !publicPages.includes(to.path)
  // TODO: localStorage には user はセットしない方向で
  const token = localStorage.getItem('access')
  console.log('router.js ... token=', token)
  // console.log('router.js ... to=', to)
  // console.log('router.js ... from=', from)
  // console.log('router.js ... next=', next)
  //const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): {};
  // accessトークンで取得してみる
  // const user = userService.getUser()
  //   .then(user => {
  //     this.setUser(user)
  //     console.log('Succeeded to get user by access token!')
  //     this.$router.replace('/')
  //   })

  // if (loginRequired && !user.loggedIn) {
  if (loginRequired && token == null) {
    return next('/login')
  }
  next()
})
*/

export default router
