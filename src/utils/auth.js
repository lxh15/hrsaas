import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 存入token的时候 顺便把时间戳记录一下 方便判断token过期
export const setTokenTime = () => {
  Cookies.set('tokenTime', Date.now())
}

export const getTokenTime = () => {
  return Cookies.get('tokenTime')
}
