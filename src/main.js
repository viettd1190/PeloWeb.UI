import Vue from 'vue';
import App from './App';
import Vuetify from 'vuetify';
import router from './router';
import store from './store';

import 'font-awesome/css/font-awesome.css';
import 'vue-select/dist/vue-select.css';
import './theme/default.styl';
import '@/assets/styles/style.css'
import VeeValidate from 'vee-validate';
import Truncate from 'lodash.truncate';
import vSelect from 'vue-select'
Vue.config.productionTip = false;

Vue.filter('truncate', Truncate);
Vue.use(VeeValidate, { fieldsBagName: 'formFields' });
Vue.use(Vuetify, {
  options: {
    themeVariations: ['primary', 'secondary', 'accent'],
    extra: {
      mainToolbar: {
        color: 'primary'
      },
      sideToolbar: {},
      sideNav: 'primary',
      mainNav: 'primary lighten-1',
      bodyBg: ''
    }
  }
});
Vue.component('select2', vSelect)
// eslint-disable-next-line
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
