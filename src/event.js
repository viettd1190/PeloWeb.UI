import store from '@/store';

export default [
  {
    name: 'APP_LOGIN_SUCCESS',
    callback: function () {
      this.$router.push({ path: '/' });
    }
  },
  {
    name: 'APP_LOGOUT',
    callback: function () {
      store.dispatch('logOut').then(_ => {
        this.$router.replace({ path: '/login' });
      });
    }
  },
  {
    name: 'EXPIRED_TOKEN',
    callback: function () {
      store.dispatch('refreshToken');
    }
  },
  {
    name: 'APP_PAGE_LOADED',
    callback: function () {}
  },
  {
    name: 'APP_PAGE_BACK',
    callback: function () {
      window.history.back();
    }
  },
  {
    name: 'APP_AUTH_FAILED',
    callback: function () {
      this.$router.push('/login');
      this.$message.error('Token has expired');
    }
  },
  {
    name: 'APP_BAD_REQUEST',
    callback: function (msg) {
      this.$message.error(msg);
    }
  },
  {
    name: 'APP_ACCESS_DENIED',
    callback: function (msg) {
      window.location.href = '#/403';
    }
  },
  {
    name: 'APP_RESOURCE_DELETED',
    callback: function (msg) {
      this.$message.success(msg);
    }
  },
  {
    name: 'APP_RESOURCE_UPDATED',
    callback: function (msg) {
      this.$message.success(msg);
    }
  }
];
