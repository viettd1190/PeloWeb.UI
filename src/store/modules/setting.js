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
      state.provinces = data;//.map(x => {return {id:x.id, text: x.name}});
    },
    STATE_UPDATE_DISTRICTS: (state, data) => {
      state.districts = data;//.map(x => {return {id:x.id, text: x.name}});
    },
    STATE_UPDATE_WARDS: (state, data) => {
      state.wards = data;//.map(x => {return {id:x.id, text: x.name}});
    },
    STATE_UPDATE_BRANCHS: (state, data) => {
      state.branchs = data;//.map(x => {return {id:x.id, text: x.name}});
    },
    STATE_UPDATE_ROLES: (state, data) => {
      state.roles = data;//.map(x => {return {id:x.id, text: x.name}});
    },
  },
  actions: {    
    ///province
    async GetProvinceAll ({ state, commit }) {
      return await new Promise((resolve, reject) => {
        API.setting
          .getProvinceAll()
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
    ///district
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
    ///ward
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
    ///branch
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
    ///role
    async GetRoleAll ({ state, commit }, params) {
      return await new Promise((resolve, reject) => {
        API.setting
          .getRolehAll()
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
  }
};

export default setting;
