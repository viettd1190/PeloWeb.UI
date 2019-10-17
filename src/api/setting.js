import request from '@/api/request';

export function getAppConfigList (params) {
  return request({
    url: 'config',
    method: 'get',
    params
  });
}
export function createAppConfig (data) {
  return request({
    url: 'config',
    method: 'post',
    data
  });
}
export function updateAppConfig (data) {
  return request({
    url: 'config',
    method: 'put',
    data
  });
}
export function getAppConfigById (params) {
  return request({
    url: 'config/'+params,
    method: 'get',
    
  });
}
export function deleteAppConfigById (params) {
  return request({
    url: 'config/'+params,
    method: 'delete',    
  });
}
export function getBranchs (params) {
  return request({
    url: 'branch',
    method: 'get',
    params
  });
}
export function getBranchAll (params) {
  return request({
    url: 'branch/all',
    method: 'get',
  });
}
export function createBranch (data) {
  return request({
    url: 'branch',
    method: 'post',
    data
  });
}
export function updateBranch (data) {
  return request({
    url: 'branch',
    method: 'put',
    data
  });
}
export function getBranchById (params) {
  return request({
    url: 'branch/'+params,
    method: 'get',
    
  });
}
export function deleteBranchById (params) {
  return request({
    url: 'branch/'+params,
    method: 'delete',    
  });
}
export function getProvinces (params) {
  return request({
    url: 'province/all',
    method: 'get',    
  });
}
export function getDistrictsByProvince (params) {
  return request({
    url: 'district/all',
    method: 'get',
    params
  });
}
export function getWardsByDistrict (params) {
  return request({
    url: 'ward/all',
    method: 'get',
    params
  });
}
