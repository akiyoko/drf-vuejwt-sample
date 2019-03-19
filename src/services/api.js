import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// 共通前処理
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('access')
  if (token) {
    config.headers.Authorization = 'JWT ' + token
    return config
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 共通エラー処理
/*
api.interceptors.response.use(function (response) {
}, function (error) {
  // 認証エラー
  if (error.response.status === 401) {
    console.log('Got 401 Error !!')
    localStorage.removeItem('access')
    location.reload(true)
    // システムエラー
  //} else if (error.response.status === 500) {
  //  console.log('500 Error !!')
  }
  return Promise.reject(error)
})
*/

export default api
