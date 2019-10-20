import axios from 'axios';
import store from '@/store';
import { getAccessToken, getLoggedUser } from '@/utils/auth';
import {messageResult} from '@/utils/index';

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 60000
});

service.interceptors.request.use(
  config => {
    if (getAccessToken()) {
      config.headers['Authorization'] = `Bearer ${getAccessToken()}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

service.interceptors.response.use(
  response => {
    if (
      response.status === 200 &&
      response.data.message === 'ERR_INVALID_PERMISSION'
    ) {
      window.getApp.$emit('APP_ACCESS_DENIED');
    } else {
      return response;
    }
  },
  error => {
    const originalRequest = error.config;
    if (error.message =="Network Error" || error.response.status === 401 && !originalRequest._retry) {
      window.getApp.showMessage(messageResult.RequestFail,messageResult.Error);
      originalRequest._retry = true;
      const accessToken = getAccessToken();
      const loggedUser = getLoggedUser();
      if (!accessToken || !loggedUser) {
        window.location.href = '/#/login';
      } else {
        return axios(originalRequest);
      }
    }
    if (error.response.status === 403) {
      window.getApp.$emit('APP_ACCESS_DENIED');
    }
    if (error.response.status === 500) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default service;
