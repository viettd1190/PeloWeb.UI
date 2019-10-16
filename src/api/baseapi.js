import store from '@/store';
import axios from 'axios';
import { getAccessToken, getLoggedUser } from '@/utils/auth';

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
      return await axios.put({baseURL:process.env.BASE_API,url:api,method:'get'}, {
        headers: {'Authorization': 'Bearer ' + store.token,'Content-Type': 'application/json;charset=UTF-8'},
        data:data
      });
    } catch (error) {
      window.getApp.showMessage(error,'error');
    }
  }
  export async function remove (api,params) {
    try {
      return await axios.delete({baseURL:process.env.BASE_API,url:api,method:'get'}, {
        headers: {'Authorization': 'Bearer ' + store.token,'Content-Type': 'application/json;charset=UTF-8'},
        params: params
      });
    } catch (error) {
      window.getApp.showMessage(error,'error');
    }
  }
