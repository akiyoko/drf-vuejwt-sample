import api from '@/services/api'
import store from '@/store'
import router from '@/router'

// ログイン
function login (username, password) {
  console.log('services/userService.js ... login() is called. username=', username)
  return api.post('/auth/jwt/create/', {
    'username': username,
    'password': password
  }).then(response => {
    // localStorageにJWTトークンを保存
    localStorage.setItem('access', response.data.access)
    // Get user
    return getUser().then(user => user)
  })
}

// ユーザー情報を取得
function getUser () {
  return api.get('/auth/users/me/')
    .then(response => {
      const user = response.data
      store.dispatch('setUser', { user: user })
      return user
    })
}

// ログアウト
function logout () {
  store.dispatch('removeUser')
  localStorage.removeItem('access')
  router.replace('/login')
}

export default {
  login,
  getUser,
  logout
}
