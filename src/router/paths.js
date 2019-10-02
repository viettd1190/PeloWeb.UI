export default [
  {
    path: '*',
    meta: {
      public: true
    },
    redirect: {
      path: '/404'
    }
  },
  {
    path: '/404',
    meta: {
      public: true
    },
    name: 'NotFound',
    component: () => import(`@/pages/notfound.vue`)
  },
  {
    path: '/403',
    meta: {
      public: true
    },
    name: 'AccessDenied',
    component: () => import(`@/pages/deny.vue`)
  },
  {
    path: '/500',
    meta: {
      public: true
    },
    name: 'ServerError',
    component: () => import(`@/pages/error.vue`)
  },
  {
    path: '/login',
    meta: {
      public: true
    },
    name: 'Login',
    component: () => import(`@/pages/login.vue`)
  },
  {
    path: '/',
    meta: {},
    name: 'Root',
    redirect: {
      name: 'Home'
    }
  },{
    path: '/home',
    meta: { breadcrumb: true },
    name: 'Home',
    component: () => import(`@/pages/home/index.vue`)
  }
];
