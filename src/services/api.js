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
  // メッセージエリアをクリア
  store.commit('message/clear')
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
  console.log('error=', error)
  console.log('error.response=', error.response)
  const status = error.response ? error.response.status : 500
  console.log('status=', status)

  let message
  if (status === 400) {
    // バリデーションNG
    const warnings = Object.entries(error.response.data)
    store.commit('message/set', { warnings: warnings })

  } else if (status === 401) {
    // 認証エラー
    const token = localStorage.getItem('access')
    if (token != null) {
      message = "ログイン有効期限切れ"
      // localStorage.removeItem('access')
    } else {
      message = "認証エラー"
    }
    store.commit('message/set', { error: message })

  } else if (status === 403) {
    // 権限エラー
    message = "権限エラーです。"
    store.commit('message/set', { error: message })

  } else {
    // その他のエラー
    message = error.statusText ? error.statusText : "想定外のエラーです。"
    store.commit('message/set', { error: message })
  }
  return Promise.reject(error)
})

export default api
