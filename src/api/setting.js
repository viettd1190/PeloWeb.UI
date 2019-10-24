import request from '@/api/request';
export function getProvinceAll () {
  return request({
    url: 'province/all',
    method: 'get'
  });
}
export function getBranchAll () {
  return request({
    url: 'branch/all',
    method: 'get'
  });
}
export function getRolehAll () {
  return request({
    url: 'role/all',
    method: 'get'
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
export function getCountries () {
  return request({
    url: 'country/all',
    method: 'get',
  });
}
