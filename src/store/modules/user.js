import axios from 'axios';
import API from '@/api/index';
import * as Auth from '@/utils/auth';

const user = {
  state: {
    token: Auth.getAccessToken(),
    loggedUser: Auth.getLoggedUser(),
    expireToken: Auth,
    users: [],
    isUpdatePass: -1,
    profile: {
      username: '',
      displayName: '',
      fullName: '',
      avatar: '',
      phoneNumber: '',
      email: '',
      branchId: 0,
      roleId: 0,
      time: new Date()
    }
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      let access_token = token ? token.access_token : '';
      Auth.setAccessToken(access_token);
      state.token = access_token;
    },
    SET_LOGGED_USER: (state, loggedUser) => {
      Auth.setLoggedUser(loggedUser);
      state.loggedUser = loggedUser;
    },
    SET_STORE_USERS: (state, users) => {
      state.users = users;
    },
    SET_UPDATE_PASSWORD_STATE: (state, flag) => {
      state.isUpdatePass = flag;
    },
    SET_UPDATE_PROFILE_STATE: (state, data) => {
      state.profile.username = data.username;
      state.profile.displayName = data.displayName;
      state.profile.fullName = data.fullName;
      state.profile.avatar = data.avatar;
      state.profile.phoneNumber = data.phoneNumber;
      state.profile.email = data.email;
      state.profile.branchId = data.branchId;
      state.profile.roleId = data.roleId;
      state.profile.time = new Date();
    }
  },

  actions: {
    loginByUsername ({ commit }, model) {
      return new Promise((resolve, reject) => {
        API.user
          .loginByUsername(model)
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              let token = {
                access_token: result.data.token
              };
              commit('SET_TOKEN', token);
              let loggedUser = {
                u: result.data.username,
                d: result.data.displayName,
                a: result.data.avatar
              };
              commit('SET_LOGGED_USER', loggedUser);
              resolve(token);
            } else {
              reject(result.message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    CreateUser ({ commit }, model) {
      return new Promise((resolve, reject) => {
        API.user
          .insertUser(model)
          .then(response => {
            if (response.status == 200) {
              resolve(response);
            } else {
              reject(result.data.Code);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    UpdateUserInfo ({ commit }, model) {
      return new Promise((resolve, reject) => {
        API.user
          .updateUser(model)
          .then(response => {
            if (response.status == 200) {
              resolve(response);
            } else {
              reject(response.data.Code);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    deleteUser ({commit }, id) {
      return new Promise((resolve, reject) => {
        API.user
          .deleteUser(id)
          .then(response => {
            let result = response.data;
            if (result.Data) {
              resolve(token);
            } else {
              reject(result.Code);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    GetUserList ({ state, commit }, params) {
      return new Promise((resolve, reject) => {
        API.user
          .getUsers(params)
          .then(response => {
            let result = response.data;
            if (result.Users) {
              commit('SET_STORE_USERS', result.Users);
              resolve(result);
            } else {
              reject(result.Message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    logOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('SET_LOGGED_USER', '');

        Auth.removeToken();
        resolve();
      });
    },
    UpdatePassword ({ commit }, model) {
      return new Promise((resolve, reject) => {
        API.user
          .changepassword(model)
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              commit('SET_UPDATE_PASSWORD_STATE', 1);
            }
            resolve(result.message);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    ForgotPassword ({ commit }, model) {
      return new Promise((resolve, reject) => {
        API.user
          .forgotpassword(model)
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
    async GetProfile ({ commit }) {
      return await new Promise((resolve, reject) => {
        API.user
          .getprofile()
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              commit('SET_UPDATE_PROFILE_STATE', result.data);
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
    UpdateProfile ({ commit }, model) {
      return new Promise((resolve, reject) => {
        API.user
          .updateprofile(model)
          .then(response => {
            let result = response.data;
            if (result.isSuccess) {
              resolve(result.isSuccess);
            } else {
              reject(result.message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async UpdateInfomation({commit,state},model){
      try {
        return await axios.put('http://localhost:33518/api/account/information',model,{
          headers: {
              "Accept": "application/json",
              "Content-type": "application/json",
              "Authorization": "Bearer " + state.token
          }});
      } catch (error) {
        return error;
      }
    }

  }
};

export default user;
