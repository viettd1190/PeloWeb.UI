import axios from 'axios';
import API from '@/api/index';
import * as Auth from '@/utils/auth';

const product = {
  state: {
  },

  mutations: {
  },

  actions: {
    // /User
    async GetProductGroups ({ state, commit }, params) {
      return await new Promise((resolve, reject) => {
        API.product
          .getProductGroups(params)
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
    async GetProductGroupAll ({ state, commit }, params) {
      return await new Promise((resolve, reject) => {
        API.product
          .getProductGroupAll(params)
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
    async CreateProductGroup ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.product
          .createProductGroup(model)
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
    async UpdateProductGroup ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.product
          .updateProductGroup(model)
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
    async DeleteProductGroup ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.product
          .deleteProductGroup(model)
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
    async GetProductGroup ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.product
          .getProductGroup(model)
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
    }
  }
};

export default product;
