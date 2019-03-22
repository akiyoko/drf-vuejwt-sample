import api from '@/services/api'
import store from '@/store'

/**
 * ログイン
 * @param username
 * @param password
 * @returns {Promise}
 */
function login (username, password) {
  console.log('services/userService.js ... login() is called. username=', username)
  return api.post('/auth/jwt/create/', {
    'username': username,
    'password': password
  })
    .then(response => {
      console.log('888', response)
      // localStorageにJWTトークンを保存
      localStorage.setItem('access', response.data.access)
      // ユーザー情報を取得してクライアント側の内部状態を更新
      return getUser()
        .then(user => user)
    })
    .catch(error => {
      console.log('999', error)
    })
}

/**
 * ログアウト
 */
function logout () {
  // localStorageからJWTトークンを削除
  localStorage.removeItem('access')
  // クライアント側の内部状態を更新
  store.commit('user/removeUser')
}

/**
 * ユーザー情報を取得
 * @returns {Promise}
 */
function getUser () {
  console.log('11111')
  return api.get('/auth/users/me/')
    .then(response => {
      console.log('22222')
      const user = response.data
      console.log('3333')
      // クライアント側の内部状態を更新
      store.commit('user/setUser', { user: user })
      return user
    })
}

export default {
  login,
  getUser,
  logout
}
