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
  },
  {
    path: '/forgotpassword',
    meta: {
      public: true
    },
    name: 'forgotpassword',
    component: () => import(`@/pages/forgotpassword.vue`)
  },
  {
    path: '/updateprofile',
    meta: {
      breadcrumb: true
    },
    name: 'updateprofile',
    component: () => import(`@/pages/updateprofile.vue`)
  },
  {
    path: '/CRM/Index',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/Index',
    component: () => import(`@/pages/crm/index.vue`)
  },{
    path: '/CRM/KhachChuaXuLyTrongNgay',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/KhachChuaXuLyTrongNgay',
    component: () => import(`@/pages/crm/KhachChuaXuLyTrongNgay.vue`)
  },{
    path: '/CRM/KhachToiHenCanChamSoc',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/KhachToiHenCanChamSoc',
    component: () => import(`@/pages/crm/KhachToiHenCanChamSoc.vue`)
  },{
    path: '/CRM/KhachQuaHenChamSoc',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/KhachQuaHenChamSoc',
    component: () => import(`@/pages/crm/KhachQuaHenChamSoc.vue`)
  },{
    path: '/CRM/KhachToiHenNgayMai',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/KhachToiHenNgayMai',
    component: () => import(`@/pages/crm/KhachToiHenNgayMai.vue`)
  }
  ,{
    path: '/CRM/KhachToiHenNgayMai',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/KhachToiHenNgayMai',
    component: () => import(`@/pages/crm/KhachToiHenNgayMai.vue`)
  },
  ,{
    path: '/CRM/CRMStatus',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/CRMStatus/Index',
    component: () => import(`@/pages/crm/CRMStatus.vue`)
  },
  ,{
    path: '/CRM/CRMPriority',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/CRMPriority/Index',
    component: () => import(`@/pages/crm/CRMPriority.vue`)
  },
  ,{
    path: '/CRM/CustomerSource',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/CustomerSource/Index',
    component: () => import(`@/pages/crm/CustomerSource.vue`)
  },
  ,{
    path: '/CRM/CustomerGroup',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/CustomerGroup',
    component: () => import(`@/pages/crm/CustomerGroup.vue`)
  },
  ,{
    path: '/CRM/CustomerGroup/Add',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/CustomerGroup',
    component: () => import(`@/pages/crm/components/AddCustomerGroup.vue`)
  },
  ,{
    path: '/CRM/CustomerGroup/Edit/:id',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/CustomerGroup',
    component: () => import(`@/pages/crm/components/EditCustomerGroup.vue`)
  },
  ,{
    path: '/Product/Index',
    meta: {
      breadcrumb: true
    },
    name: 'Product/Index',
    component: () => import(`@/pages/product/Index.vue`)
  },
  ,{
    path: '/Product/ProductGroup',
    meta: {
      breadcrumb: true
    },
    name: 'Product/ProductGroup',
    component: () => import(`@/pages/product/ProductGroup.vue`)
  },
  ,{
    path: '/Product/ProductGroup/Add',
    meta: {
      breadcrumb: true
    },
    name: 'Product/ProductGroup',
    component: () => import(`@/pages/product/components/AddProductGroup.vue`)
  },
  ,{
    path: '/Product/ProductGroup/Edit/:id',
    meta: {
      breadcrumb: true
    },
    name: 'Product/ProductGroup',
    component: () => import(`@/pages/product/components/EditProductGroup.vue`)
  },
  ,{
    path: '/Product/Manufacturer',
    meta: {
      breadcrumb: true
    },
    name: 'Product/Manufacturer/Index',
    component: () => import(`@/pages/product/Manufacturer.vue`)
  }
  ,{
    path: '/Setting/AppConfig',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/AppConfig/Index',
    component: () => import(`@/pages/setting/AppConfig.vue`)
  },{
    path: '/Setting/Branch',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/Branch/Index',
    component: () => import(`@/pages/setting/Branch.vue`)
  },{
    path: '/Setting/MainNavigation',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/MainNavigation/Index',
    component: () => import(`@/pages/setting/MainNavigation.vue`)
  },{
    path: '/Setting/MainNavigationGroup',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/MainNavigationGroup/Index',
    component: () => import(`@/pages/setting/MainNavigationGroup.vue`)
  },{
    path: '/Setting/SystemUser',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/SystemUser/Index',
    component: () => import(`@/pages/setting/SystemUser.vue`)
  },{
    path: '/Setting/SystemRole',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/SystemRole/Index',
    component: () => import(`@/pages/setting/SystemRole.vue`)
  },{
    path: '/Setting/Admin/Icons',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/Admin/Icons',
    component: () => import(`@/pages/setting/Icons.vue`)
  },{
    path: '/Setting/UserActivityLog',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/UserActivityLog/Index',
    component: () => import(`@/pages/setting/UserActivityLog.vue`)
  },{
    path: '/Recruitment/Candidate',
    meta: {
      breadcrumb: true
    },
    name: 'Recruitment/Candidate/Index',
    component: () => import(`@/pages/recruitment/Candidate.vue`)
  },{
    path: '/Recruitment/CandidateStatus',
    meta: {
      breadcrumb: true
    },
    name: 'Recruitment/CandidateStatus/Index',
    component: () => import(`@/pages/recruitment/CandidateStatus.vue`)
  },{
    path: '/Recruitment/Index',
    meta: {
      breadcrumb: true
    },
    name: 'Recruitment/Index',
    component: () => import(`@/pages/recruitment/Index.vue`)
  },{
    path: '/Recruitment/RecruitmentStatus',
    meta: {
      breadcrumb: true
    },
    name: 'Recruitment/RecruitmentStatus/Index',
    component: () => import(`@/pages/recruitment/RecruitmentStatus.vue`)
  },{
    path: '/Warranty/WarrantyStatus',
    meta: {
      breadcrumb: true
    },
    name: 'Warranty/WarrantyStatus/Index',
    component: () => import(`@/pages/warranty/WarrantyStatus.vue`)
  },{
    path: '/Warranty/WarrantyStatusPermission',
    meta: {
      breadcrumb: true
    },
    name: 'Warranty/WarrantyStatusPermission/Index',
    component: () => import(`@/pages/warranty/WarrantyStatusPermission.vue`)
  },{
    path: '/Warranty/Index',
    meta: {
      breadcrumb: true
    },
    name: 'Warranty/Index',
    component: () => import(`@/pages/warranty/Index.vue`)
  },{
    path: '/Warranty/WarrantyDescription',
    meta: {
      breadcrumb: true
    },
    name: 'Warranty/WarrantyDescription/Index',
    component: () => import(`@/pages/warranty/WarrantyDescription.vue`)
  },{
    path: '/Receipt/ReceiptStatus',
    meta: {
      breadcrumb: true
    },
    name: 'Receipt/ReceiptStatus/Index',
    component: () => import(`@/pages/receipt/ReceiptStatus.vue`)
  },{
    path: '/Receipt/ReceiptStatusPermission',
    meta: {
      breadcrumb: true
    },
    name: 'Receipt/ReceiptStatusPermission/Index',
    component: () => import(`@/pages/receipt/ReceiptStatusPermission.vue`)
  },{
    path: '/Receipt/Index',
    meta: {
      breadcrumb: true
    },
    name: 'Receipt/Index',
    component: () => import(`@/pages/receipt/Index.vue`)
  },{
    path: '/Receipt/ReceiptDescription',
    meta: {
      breadcrumb: true
    },
    name: 'Receipt/ReceiptDescription/Index',
    component: () => import(`@/pages/receipt/ReceiptDescription.vue`)
  }
  ,{
    path: '/Task/TaskStatus',
    meta: {
      breadcrumb: true
    },
    name: 'Task/TaskStatus/Index',
    component: () => import(`@/pages/task/TaskStatus.vue`)
  }
  ,{
    path: '/Task/TaskPriority',
    meta: {
      breadcrumb: true
    },
    name: 'Task/TaskPriority/Index',
    component: () => import(`@/pages/task/TaskPriority.vue`)
  }
  ,{
    path: '/Task/TaskType',
    meta: {
      breadcrumb: true
    },
    name: 'Task/TaskType/Index',
    component: () => import(`@/pages/task/TaskType.vue`)
  }
  ,{
    path: '/Task/TaskLoop',
    meta: {
      breadcrumb: true
    },
    name: 'Task/TaskLoop/Index',
    component: () => import(`@/pages/task/TaskLoop.vue`)
  }
  ,{
    path: '/Task/TaskStatusPermission',
    meta: {
      breadcrumb: true
    },
    name: 'Task/TaskStatusPermission/Index',
    component: () => import(`@/pages/task/TaskStatusPermission.vue`)
  }
  ,{
    path: '/Task/Index',
    meta: {
      breadcrumb: true
    },
    name: 'Task/Index',
    component: () => import(`@/pages/task/Index.vue`)
  }
  ,{
    path: '/Invoice/Index',
    meta: {
      breadcrumb: true
    },
    name: 'Invoice/Index',
    component: () => import(`@/pages/invoice/Index.vue`)
  },{
    path: '/Invoice/PayMethod',
    meta: {
      breadcrumb: true
    },
    name: 'Invoice/PayMethod/Index',
    component: () => import(`@/pages/invoice/PayMethod.vue`)
  }
  ,{
    path: '/Invoice/InvoiceStatus',
    meta: {
      breadcrumb: true
    },
    name: 'Invoice/InvoiceStatus/Index',
    component: () => import(`@/pages/invoice/InvoiceStatus.vue`)
  }
  ,{
    path: '/Invoice/InvoiceStatusInRole',
    meta: {
      breadcrumb: true
    },
    name: 'Invoice/InvoiceStatusInRole/Index',
    component: () => import(`@/pages/invoice/InvoiceStatusInRole.vue`)
  },
  {
    path: '/Customer',
    meta: { breadcrumb: true },
    name: 'Customer',
    component: () => import(`@/pages/customer/index.vue`)
  },
  {
    path: '/Setting/AppConfig/Add',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/AppConfig',
    component: () => import(`@/pages/setting/components/FormAddAppConfig.vue`)
  },
  {
    path: '/Setting/AppConfig/Edit/:id',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/AppConfig',
    component: () => import(`@/pages/setting/components/FormEditAppConfig.vue`)
  },
  {
    path: '/Setting/Branch/Add',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/Branch',
    component: () => import(`@/pages/setting/components/AddBranch.vue`)
  },
  {
    path: '/Setting/Branch/Edit/:id',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/Branch',
    component: () => import(`@/pages/setting/components/EditBranch.vue`)
  },
  {
    path: '/Setting/SystemRole/Add',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/SystemRole',
    component: () => import(`@/pages/setting/components/AddRole.vue`)
  },
  {
    path: '/Setting/SystemRole/Edit/:id',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/SystemRole',
    component: () => import(`@/pages/setting/components/EditRole.vue`)
  },
  {
    path: '/Setting/SystemUser/Add',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/SystemUser',
    component: () => import(`@/pages/setting/components/AddUser.vue`)
  },
  {
    path: '/Setting/SystemUser/Edit/:id',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/SystemUser',
    component: () => import(`@/pages/setting/components/EditUser.vue`)
  },
];
