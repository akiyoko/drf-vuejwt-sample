import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import userService from '@/services/userService'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '*', redirect: '/' }
  ]
})

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

export default router
