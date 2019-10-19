import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import user from './modules/user';
import setting from './modules/setting';
import crm from './modules/crm';
import product from './modules/product';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    setting,
    crm,
    product
  },
  getters
});

export default store;
