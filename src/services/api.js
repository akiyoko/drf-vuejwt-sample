import axios from 'axios'
import store from '@/store'

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
api.interceptors.response.use(function (response) {
  return response
}, function (error) {
  const status = error.response ? error.response.status : 500
  console.log('status=', status)
  console.log('error=', error)

  if (status === 400) {
    // バリデーションNG
    // this.messages.warnings = Object.entries(error.response.data)
    const warnings = Object.entries(error.response.data)
    store.commit('message/setMessage', { warnings: warnings })

  } else if (status === 401) {
    // 認証エラー
    const message = '認証エラーです。'
    store.commit('message/setMessage', { error: message })

  } else if (status === 403) {
    // 権限エラー
    const message = '権限エラーです。'
    store.commit('message/setMessage', { error: message })

  } else {
    // その他のエラー
    // this.messages.error = error.statusText
    const message = error.statusText ? error.statusText : '想定外のエラーです。'
    store.commit('message/setMessage', { error: message })
  }
  return Promise.reject(error)
})

export default api
