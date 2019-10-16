import axios from 'axios';
import API from '@/api/index';

const setting = {
  state: {
    editAppConfig: null,
    editBranch: null
  },
  mutations: {
    STATE_UPDATE_EDIT_APPCONFIG: (state, data) => {
      state.editAppConfig = data;
    },
    STATE_UPDATE_EDIT_BRANCH: (state, data) => {
      state.editBranch = data;
    }
  },
  actions: {
    // /AppConfig
    async GetAppConfigList ({ state, commit }, params) {
      return await new Promise((resolve, reject) => {
        API.setting
          .getAppConfigList(params)
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
    async CreateAppConfig ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.setting
          .createAppConfig(model)
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              resolve(result.message);
            } else {
              reject(result.message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async UpdateAppConfig ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.setting
          .updateAppConfig(model)
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              resolve(result.message);
            } else {
              reject(result.message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async DeleteAppConfig ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.setting
          .deleteAppConfigById(model)
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              resolve(result.message);
            } else {
              reject(result.message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async GetAppConfig ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.setting
          .getAppConfigById(model)
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              commit('STATE_UPDATE_EDIT_APPCONFIG', result.data);
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
    // /Branch
    async GetBranchs ({ state, commit }, params) {
      return await new Promise((resolve, reject) => {
        API.setting
          .getBranchs(params)
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
    async CreateBranch ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.setting
          .createBranch(model)
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              resolve(result.message);
            } else {
              reject(result.message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async UpdateBranch ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.setting
          .updateBranch(model)
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              resolve(result.message);
            } else {
              reject(result.message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async DeleteBranch ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.setting
          .deleteBranchById(model)
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              resolve(result.message);
            } else {
              reject(result.message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async GetBranch ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.setting
          .getBranchById(model)
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              commit('STATE_UPDATE_EDIT_BRANCH', result.data);
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

export default setting;