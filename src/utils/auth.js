import Cookies from 'js-cookie'
import store from '../store'
import storage from './storage'

const TokenKey = 'EGG_SESS'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function isLogin(){
  let user = store.state.user;
  if (user && user._id) return true
  else {
    user = storage.get('user')
    return user && user._id
  }
}