const AccessTokenKey = 'Access-Token';
const LoggedUserKey = 'LoggedUserInfo';
import Cookies from 'js-cookie';

export function getAccessToken () {
  let token = localStorage.getItem(AccessTokenKey);
  return token ? token : Cookies.get(AccessTokenKey);
}

export function setAccessToken (token) {
  localStorage.setItem(AccessTokenKey, token);
  return Cookies.set(AccessTokenKey, token);
}

export function getLoggedUser () {
  let userFromLocalStorage = localStorage.getItem(LoggedUserKey);
  let userFromCookie = Cookies.get(LoggedUserKey);

  return userFromLocalStorage
    ? JSON.parse(userFromLocalStorage)
    : userFromCookie
      ? JSON.parse(userFromCookie)
      : null;
}

export function setLoggedUser (user) {
  let json = JSON.stringify(user);
  localStorage.setItem(LoggedUserKey, json);
  return Cookies.set(LoggedUserKey, json);
}

export function removeToken () {
  localStorage.removeItem(AccessTokenKey);
  localStorage.removeItem(LoggedUserKey);
  Cookies.remove(LoggedUserKey);
  return Cookies.remove(AccessTokenKey);
}
