import axios from 'axios';
import API from '@/api/index';
import * as Auth from '@/utils/auth';

const crm = {
  state: {
  },

  mutations: {
  },

  actions: {
    // /User
    async GetCustomerGroups ({ state, commit }, params) {
      return await new Promise((resolve, reject) => {
        API.crm
          .getCustomerGroups(params)
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
    async GetCustomerGroupAll ({ state, commit }, params) {
      return await new Promise((resolve, reject) => {
        API.crm
          .getCustomerGroupAll(params)
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
    async CreateCustomerGroup ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.crm
          .createCustomerGroup(model)
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
    async UpdateCustomerGroup ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.crm
          .updateCustomerGroup(model)
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
    async DeleteCustomerGroup ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.crm
          .deleteCustomerGroup(model)
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
    async GetCustomerGroup ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.crm
          .getCustomerGroup(model)
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

export default crm;
