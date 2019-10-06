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
