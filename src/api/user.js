import request from '@/api/request';
import {get,post,put,remove} from '@/api/baseapi';

export function loginByUsername (data) {
  return request({
    url: 'account/logon',
    method: 'post',
    data
  });
  //return post('account/logon',data);
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

export function getUsers (params) {
  return request({
    url: 'user',
    method: 'get',
    params
  });
}
export function getUser (params) {
  return request({
    url: 'user/' + params,
    method: 'get'
  });
}
export function getUserAll (params) {
  return request({
    url: 'user/all',
    method: 'get'
  });
}
export function createUser (data) {
  return request({
    url: 'user',
    method: 'post',
    data
  });
}
export function updateUser (data) {
  return request({
    url: 'user',
    method: 'put',
    data
  });
}
export function deleteUser (params) {
  return request({
    url: 'user/' + params,
    method: 'delete'
  });
}
