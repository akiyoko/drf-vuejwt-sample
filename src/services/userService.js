import api from '@/services/api'

// ログイン
function login(username, password) {
  console.log('services/userService.js ... login() is called. username=', username);
  return api.post('/auth/jwt/create/', {
    'username': username,
    'password': password
  }).then(response => {
    console.log('/auth/jwt/create/ success!!');
    // localStorageにJWTトークンを保存
    localStorage.setItem('access', response.data.access);
    // Get user
    return getUser().then(user => user)
  }).catch(error => {
    localStorage.removeItem('access');
    return Promise.reject(error)
  })
}

// ユーザー情報を取得
function getUser() {
  return api.get('/auth/users/me/')
    .then(response => {
      console.log('/auth/users/me/ success!!');
      return response.data
    })
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('access');
  //location.reload(true);
}

/*
function handleResponse(response) {
  return response.text()
    .then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
          logout();
          location.reload(true);
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    });
}
*/

export default {
  login,
  getUser,
  logout
};
