import axios from 'axios';
import store from '@/store';
import { getAccessToken, getRefreshToken, getLoggedUser } from '@/utils/auth';

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 60000
});

service.interceptors.request.use(
  config => {
    if (store.getters.token) { config.headers['Authorization'] = `Bearer ${getAccessToken()}` }
    return config;
  },
  error => Promise.reject(error)
);

service.interceptors.response.use(
  response => {
    if (
      response.status === 200 &&
      response.data.code === 'ERR_INVALID_PERMISSION'
    ) { window.getApp.$emit('APP_ACCESS_DENIED') }
    else { 
      return response }
  },
  error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();
      const loggedUser = getLoggedUser();
      window.getApp.$emit('EXPIRED_TOKEN')      
      if (!accessToken || !refreshToken || !loggedUser) { 
        window.location.href = '/#/login' 
      }
      else { 
        return axios(originalRequest) 
      }
    }
    if (error.response.status === 403) { window.getApp.$emit('APP_ACCESS_DENIED') }
    if (error.response.status === 500) { return Promise.reject(error) }
    return Promise.reject(error);
  }
);

export default service;
