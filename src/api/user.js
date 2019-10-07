import request from '@/api/request';

export function loginByUsername (data) {
  return request({
    url: 'account/logon',
    method: 'post',
    data
  });
}
export function changepassword (data) {
  return request({
    url: 'account/changepwd',
    method: 'put',
    data
  });
}
export function forgotpassword (data) {
  return request({
    url: 'account/forgotpwd',
    method: 'put',
    data
  });
}
export function getprofile (data) {
  return request({
    url: 'account/information',
    method: 'get',    
  });
}
export function updateprofile (data) {
  return request({
    url: 'account/information',
    method: 'put',
    data
  });
}
