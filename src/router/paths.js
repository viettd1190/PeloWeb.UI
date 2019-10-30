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
      breadcrumb: true
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
  //Crm
  {
    path: '/CRM',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/Index',
    component: () => import(`@/pages/crm/index.vue`)
  },{
    path: '/CRM/Add',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/Index',
    component: () => import(`@/pages/crm/components/AddCRM.vue`)
  },{
    path: '/CRM/Edit/:id',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/Index',
    component: () => import(`@/pages/crm/components/EditCRM.vue`)
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
  }
  ,{
    path: '/CRM/CRMStatus',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/CRMStatus/Index',
    component: () => import(`@/pages/crm/CRMStatus.vue`)
  },{
    path: '/CRM/CRMStatus/Add',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/CRMStatus',
    component: () => import(`@/pages/crm/components/AddCRMStatus.vue`)
  },
  {
    path: '/CRM/CRMStatus/Edit/:id',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/CRMStatus',
    component: () => import(`@/pages/crm/components/EditCRMStatus.vue`)
  }
  ,{
    path: '/CRM/CRMPriority',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/CRMPriority',
    component: () => import(`@/pages/crm/CRMPriority.vue`)
  },{
    path: '/CRM/CRMPriority/Add',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/CRMPriority',
    component: () => import(`@/pages/crm/components/AddCRMPriority.vue`)
  },
  {
    path: '/CRM/CRMPriority/Edit/:id',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/CRMPriority',
    component: () => import(`@/pages/crm/components/EditCRMPriority.vue`)
  },{
    path: '/CRM/CRMType',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/CRMType',
    component: () => import(`@/pages/crm/CRMType.vue`)
  },{
    path: '/CRM/CRMType/Add',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/CRMType',
    component: () => import(`@/pages/crm/components/AddCRMType.vue`)
  },
  {
    path: '/CRM/CRMType/Edit/:id',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/CRMType',
    component: () => import(`@/pages/crm/components/EditCRMType.vue`)
  }
  ,{
    path: '/CRM/CustomerSource',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/CustomerSource',
    component: () => import(`@/pages/crm/CustomerSource.vue`)
  },
  ,{
    path: '/CRM/CustomerSource/Add',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/CustomerSource',
    component: () => import(`@/pages/crm/components/AddCustomerSource.vue`)
  },
  ,{
    path: '/CRM/CustomerSource/Edit/:id',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/CustomerSource',
    component: () => import(`@/pages/crm/components/EditCustomerSource.vue`)
  },{
    path: '/CRM/Country',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/Country',
    component: () => import(`@/pages/crm/Country.vue`)
  },
  {
    path: '/CRM/Country/Add',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/Country',
    component: () => import(`@/pages/crm/components/AddCountry.vue`)
  },{
    path: '/CRM/Country/Edit/:id',
    meta: {
      breadcrumb: true
    },
    name: 'CRM/Country',
    component: () => import(`@/pages/crm/components/EditCountry.vue`)
  }
  //end Crm
  //product
  ,{
    path: '/Product',
    meta: {
      breadcrumb: true
    },
    name: 'Product/Index',
    component: () => import(`@/pages/product/Index.vue`)
  },{
    path: '/Product/Add',
    meta: {
      breadcrumb: true
    },
    name: 'Product/Index',
    component: () => import(`@/pages/product/components/AddProduct.vue`)
  },{
    path: '/Product/Edit/:id',
    meta: {
      breadcrumb: true
    },
    name: 'Product/Index',
    component: () => import(`@/pages/product/components/EditProduct.vue`)
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
    path: '/Product/ProductUnit',
    meta: {
      breadcrumb: true
    },
    name: 'Product/ProductUnit',
    component: () => import(`@/pages/product/ProductUnit.vue`)
  },
  {
    path: '/Product/ProductUnit/Add',
    meta: {
      breadcrumb: true
    },
    name: 'Product/ProductUnit',
    component: () => import(`@/pages/product/components/AddProductUnit.vue`)
  },
  {
    path: '/Product/ProductUnit/Edit/:id',
    meta: {
      breadcrumb: true
    },
    name: 'Product/ProductUnit',
    component: () => import(`@/pages/product/components/EditProductUnit.vue`)
  },{
    path: '/Product/ProductStatus',
    meta: {
      breadcrumb: true
    },
    name: 'Product/ProductStatus',
    component: () => import(`@/pages/product/ProductStatus.vue`)
  },
  {
    path: '/Product/ProductStatus/Add',
    meta: {
      breadcrumb: true
    },
    name: 'Product/ProductStatus',
    component: () => import(`@/pages/product/components/AddProductStatus.vue`)
  },
  {
    path: '/Product/ProductStatus/Edit/:id',
    meta: {
      breadcrumb: true
    },
    name: 'Product/ProductStatus',
    component: () => import(`@/pages/product/components/EditProductStatus.vue`)
  },
  ,{
    path: '/Product/Manufacturer',
    meta: {
      breadcrumb: true
    },
    name: 'Product/Manufacturer',
    component: () => import(`@/pages/product/Manufacturer.vue`)
  }
  ,{
    path: '/Product/Manufacturer/Add',
    meta: {
      breadcrumb: true
    },
    name: 'Product/Manufacturer',
    component: () => import(`@/pages/product/components/AddManufacturer.vue`)
  }
  ,{
    path: '/Product/Manufacturer/Edit/:id',
    meta: {
      breadcrumb: true
    },
    name: 'Product/Manufacturer',
    component: () => import(`@/pages/product/components/EditManufacturer.vue`)
  }
  ,{
    path: '/Product',
    meta: {
      breadcrumb: true
    },
    name: 'Product/Index',
    component: () => import(`@/pages/product/Index.vue`)
  },
  //end Product
  //Setting
  ,{
    path: '/Setting/AppConfig',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/AppConfig/Index',
    component: () => import(`@/pages/setting/AppConfig.vue`)
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
  },{
    path: '/Setting/Branch',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/Branch/Index',
    component: () => import(`@/pages/setting/Branch.vue`)
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
  {
    path: '/Setting/SystemRole',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/SystemRole/Index',
    component: () => import(`@/pages/setting/SystemRole.vue`)
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
  },{
    path: '/Setting/UserActivityLog',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/UserActivityLog/Index',
    component: () => import(`@/pages/setting/UserActivityLog.vue`)
  },{
    path: '/Setting/Province',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/Province',
    component: () => import(`@/pages/setting/Province.vue`)
  },{
    path: '/Setting/Province/Add',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/Province',
    component: () => import(`@/pages/setting/components/AddProvince.vue`)
  },{
    path: '/Setting/Province/Edit/:id',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/Province',
    component: () => import(`@/pages/setting/components/EditProvince.vue`)
  },{
    path: '/Setting/District',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/District',
    component: () => import(`@/pages/setting/District.vue`)
 },{
  path: '/Setting/District/Add',
  meta: {
    breadcrumb: true
  },
  name: 'Setting/District',
  component: () => import(`@/pages/setting/components/AddDistrict.vue`)
},{
  path: '/Setting/District/Edit/:id',
  meta: {
    breadcrumb: true
  },
  name: 'Setting/District',
  component: () => import(`@/pages/setting/components/EditDistrict.vue`)
},
 {
    path: '/Setting/Ward',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/Ward',
    component: () => import(`@/pages/setting/Ward.vue`)
  },
  {
    path: '/Setting/Ward/Add',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/Ward',
    component: () => import(`@/pages/setting/components/AddWard.vue`)
  },{
    path: '/Setting/Ward/Edit/:id',
    meta: {
      breadcrumb: true
    },
    name: 'Setting/Ward',
    component: () => import(`@/pages/setting/components/EditWard.vue`)
  },
  //end Setting
  //Recruitment
  {
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
  },
  //end Recruitment
  //Warranty
  {
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
  },
  //end Warranty
  //Receipt
  {
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
  //end Receipt
  //Task
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
  //end Task
//Invoice  
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
  //end Invoice
  //Customer
  {
    path: '/Customer/Index',
    meta: { breadcrumb: true },
    name: 'Customer/Index',
    component: () => import(`@/pages/customer/index.vue`)
  },
  {
    path: '/Customer/Add',
    meta: { breadcrumb: true },
    name: 'Customer/Add',
    component: () => import(`@/pages/customer/components/AddCustomer.vue`)
  },
  {
    path: '/Customer/Edit/:id',
    meta: { breadcrumb: true },
    name: 'Customer/Edit',
    component: () => import(`@/pages/customer/components/EditCustomer.vue`)
  }
  ,{
    path: '/Customer/CustomerGroup',
    meta: {
      breadcrumb: true
    },
    name: 'Customer/CustomerGroup',
    component: () => import(`@/pages/customer/CustomerGroup.vue`)
  },
  ,{
    path: '/Customer/CustomerGroup/Add',
    meta: {
      breadcrumb: true
    },
    name: 'Customer/CustomerGroup',
    component: () => import(`@/pages/customer/components/AddCustomerGroup.vue`)
  },
  ,{
    path: '/Customer/CustomerGroup/Edit/:id',
    meta: {
      breadcrumb: true
    },
    name: 'Customer/CustomerGroup',
    component: () => import(`@/pages/customer/components/EditCustomerGroup.vue`)
  },
  //end Customer
];
