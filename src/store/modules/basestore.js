import axios from 'axios';
import API from '@/api/index';
import * as Auth from '@/utils/auth';

const product = {
  state: {
  },

  mutations: {
  },

  actions: {
    GetList ({ state, commit },params) {
      return new Promise((resolve, reject) => {
        API.baseapi
          .getList(params[0],params[1])
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              resolve(result.data);
            } else {
              reject(result.Message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async GetAll ({ state, commit }, params) {      
      return await new Promise((resolve, reject) => {
        API.baseapi
          .getAll(params[0],params[1])
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              resolve(result.data);
            } else {
              reject(result.Message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async Create ({ commit }, params) {
      return await new Promise((resolve, reject) => {
        API.baseapi
          .create(params[0],params[1])
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              resolve(result);
            } else {
              reject(result.message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async Update ({ commit },params) {
      return await new Promise((resolve, reject) => {
        API.baseapi
          .update(params[0],params[1])
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              resolve(result);
            } else {
              reject(result.message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async DeleteById ({ commit },params) {
      return await new Promise((resolve, reject) => {
        API.baseapi
          .deleteById(params[0],params[1])
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              resolve(result);
            } else {
              reject(result.message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async GetById ({ commit },params) {
      return await new Promise((resolve, reject) => {
        API.baseapi
          .getById(params[0],params[1])
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              resolve(result.data);
            } else {
              reject(result.message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  }
};

export default product;
