import axios from 'axios';
import API from '@/api/index';

const setting = {
  state: {
    provinces: [],
    roles: [],
    districts: [],
    wards: [],
    branchs: [],
  },
  mutations: {
    STATE_UPDATE_PROVINCES: (state, data) => {
      state.provinces = data;
    },
    STATE_UPDATE_DISTRICTS: (state, data) => {
      state.districts = data;
    },
    STATE_UPDATE_WARDS: (state, data) => {
      state.wards = data;
    },
    STATE_UPDATE_BRANCHS: (state, data) => {
      state.branchs = data;
    },
    STATE_UPDATE_ROLES: (state, data) => {
      state.roles = data;
    },
  },
  actions: {    
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
    async GetBranchAll ({ state, commit }, params) {
      return await new Promise((resolve, reject) => {
        API.setting
          .getBranchAll(params)
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              commit('STATE_UPDATE_BRANCHS', result.data);
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
    async UpdateBranch ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.setting
          .updateBranch(model)
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
    async DeleteBranch ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.setting
          .deleteBranchById(model)
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
    async GetBranch ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.setting
          .getBranchById(model)
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
    async GetProvinceAll ({ state, commit }, params) {
      return await new Promise((resolve, reject) => {
        API.setting
          .getProvinceAll(params)
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              commit('STATE_UPDATE_PROVINCES', result.data);
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
    async GetDistricts ({ state, commit }, params) {
      return await new Promise((resolve, reject) => {
        API.setting
          .getDistrictsByProvince(params)
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              commit('STATE_UPDATE_DISTRICTS', result.data);
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
    async GetWards ({ state, commit }, params) {
      return await new Promise((resolve, reject) => {
        API.setting
          .getWardsByDistrict(params)
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              commit('STATE_UPDATE_WARDS', result.data);
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
    // /Role
    async GetRoles ({ state, commit }, params) {
      return await new Promise((resolve, reject) => {
        API.setting
          .getRoles(params)
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
    async GetRoleAll ({ state, commit }, params) {
      return await new Promise((resolve, reject) => {
        API.setting
          .getRoleAll(params)
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              commit('STATE_UPDATE_ROLES', result.data);
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
    async CreateRole ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.setting
          .createRole(model)
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
    async UpdateRole ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.setting
          .updateRole(model)
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
    async DeleteRole ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.setting
          .deleteRole(model)
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
    async GetRole ({ commit }, model) {
      return await new Promise((resolve, reject) => {
        API.setting
          .getRole(model)
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

export default setting;
