import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import user from './modules/user';
import setting from './modules/setting';
import basestore from './modules/basestore';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    setting,
    basestore
  },
  getters
});

export default store;
