import request from '@/api/request';


export function getProductGroups (params) {
  return request({
    url: 'product_group',
    method: 'get',
    params
  });
}
export function getProductGroup (params) {
  return request({
    url: 'product_group/' + params,
    method: 'get'
  });
}
export function getProductGroupAll (params) {
  return request({
    url: 'product_group/all',
    method: 'get'
  });
}
export function createProductGroup (data) {
  return request({
    url: 'product_group',
    method: 'post',
    data
  });
}
export function updateProductGroup (data) {
  return request({
    url: 'product_group',
    method: 'put',
    data
  });
}
export function deleteProductGroup (params) {
  return request({
    url: 'product_group/' + params,
    method: 'delete'
  });
}