import request from '@/api/request';

export function loginByUsername (data) {
  return request({
    url: 'User/login',
    method: 'post',
    data
  });
}
export function changepassword (data) {
  return request({
    url: 'User/changepassword',
    method: 'put',
    data
  });
}
