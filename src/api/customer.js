import request from '@/api/request';
import {get,post,put,remove} from '@/api/baseapi';


export function getCustomerGroups (params) {
  return request({
    url: 'customer_group',
    method: 'get',
    params
  });
}
export function getCustomerGroup (params) {
  return request({
    url: 'customer_group/' + params,
    method: 'get'
  });
}
export function getCustomerGroupAll (params) {
  return request({
    url: 'customer_group/all',
    method: 'get'
  });
}
export function createCustomerGroup (data) {
  return request({
    url: 'customer_group',
    method: 'post',
    data
  });
}
export function updateCustomerGroup (data) {
  return request({
    url: 'customer_group',
    method: 'put',
    data
  });
}
export function deleteCustomerGroup (params) {
  return request({
    url: 'customer_group/' + params,
    method: 'delete'
  });
}
