import store from '@/store';
import axios from 'axios';
import { getAccessToken, getLoggedUser } from '@/utils/auth';
import request from '@/api/request';


export function getList (url,params) {
  return request({
    url: url,
    method: 'get',
    params
  });
}
export function getById (url,params) {
  return request({
    url: url + params,
    method: 'get'
  });
}
export function getAll (url,params) {
  return request({
    url: url,
    method: 'get'
  });
}
export function create (url, data) {
  return request({
    url,
    method: 'post',
    data
  });
}
export function update (url,data) {
  return request({
    url: url,
    method: 'put',
    data
  });
}
export function deleteById (url,params) {
  return request({
    url: url + params,
    method: 'delete'
  });
}

export function get (api, params) {
  try {
    return axios.create({baseURL:process.env.BASE_API,url:api,method:'get',timeout: 60000}, {
      headers: {'Authorization': 'Bearer ' + store.token,'Content-Type': 'application/json;charset=UTF-8'},
      params:params
    });
  } catch (error) {
    window.getApp.showMessage(error,'error');
  }
}
export async function post (api,data) {
    try {
      return await axios({baseURL:process.env.BASE_API,url:api,method:'post',timeout: 60000}, {
        headers: {'Authorization': 'Bearer ' + store.token,'Content-Type': 'application/json;charset=UTF-8'},
        data:data
      });
    } catch (error) {
      window.getApp.showMessage(error,'error');
    }
  }
  export async function put (api,data) {
    try {
      return await axios.put({baseURL:process.env.BASE_API,url:api,method:'put',timeout: 60000}, {
        headers: {'Authorization': 'Bearer ' + store.token,'Content-Type': 'application/json;charset=UTF-8'},
        data:data
      });
    } catch (error) {
      window.getApp.showMessage(error,'error');
    }
  }
  export async function remove (api,params) {
    try {
      return await axios.delete({baseURL:process.env.BASE_API,url:api,method:'delete',timeout: 60000}, {
        headers: {'Authorization': 'Bearer ' + store.token,'Content-Type': 'application/json;charset=UTF-8'},
        params: params
      });
    } catch (error) {
      window.getApp.showMessage(error,'error');
    }
  }
