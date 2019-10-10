const Menu = [
  {
    title: 'Trang chủ',
    group: 'apps',
    icon: 'home',
    name: 'Home',
    url: '/home',
  },
  //{ header: 'CRM' },
  {
    title:'CRM',
    icon:'phone',
    group: 'CRM',
    items:[{
      title: 'CRM',
      group: 'CRM',
      name: 'Index',
      //component:'crm'
      //href: '#/crm'
    },{
      title: 'Khách chưa xử lý trong ngày',
      group: 'CRM',
      name: 'KhachChuaXuLyTrongNgay',
    },{
      title: 'Khách tới hẹn cần chăm sóc',
      group: 'CRM',
      name: 'KhachToiHenCanChamSoc',
    },{
      title: 'Khách quá hẹn chăm sóc',
      group: 'CRM',
      name: 'KhachQuaHenChamSoc',
    },{
      title: 'Khách tới hẹn ngày mai',
      group: 'CRM',
      name: 'KhachToiHenNgayMai',
    },{
      title: 'Trạng thái',
      group: 'CRM',
      name: 'CRMStatus/Index',
    },{
      title: 'Mức độ khẩn cấp',
      group: 'CRM',
      name: 'CRMPriority/Index',
    },{
      title: 'Nguồn khách hàng',
      group: 'CRM',
      name: 'CustomerSource/Index',
    },{
      title: 'Nhóm khách hàng',
      group: 'CRM',
      name: 'CustomerType/Index',
    }]
  },
  {
    title:'Sản phẩm',
    icon:'library_books',
    group: 'Product',
    items:[{
      title: 'Danh sách sản phẩm',
      group: 'Product',
      name: 'Index',
      //component:'crm'
      //href: '#/crm'
    },{
      title: 'Nhóm sản phẩm',
      group: 'Product',
      name: 'ProductGroup/Index',
    },{
      title: 'Thương hiệu',
      group: 'Product',
      name: 'Manufacturer/Index',
    }]
  },{
    title:'Đơn hàng',
    icon:'insert_drive_file',
    group: 'Invoice',
    items:[{
      title: 'Danh sách đơn hàng',
      group: 'Invoice',
      name: 'Index',
    },{
      title: 'Hình thức thanh toán',
      group: 'Invoice',
      name: 'PayMethod/Index',
    },{
      title: 'Trạng thái đơn hàng',
      group: 'Invoice',
      name: 'InvoiceStatus/Index',
    },{
      title: 'Quyền trạng thái đơn hàng',
      group: 'Invoice',
      name: 'InvoiceStatusInRole/Index',
    }]
  },{
    title: 'Khách hàng',
    group: 'customer',
    icon: 'how_to_reg',
    name: 'Customer',
    url: '/Customer',
  },{
    title:'Công việc',
    icon:'insert_invitation',
    group: 'Task',
    items:[{
      title: 'Danh sách công việc',
      group: 'Task',
      name: 'Index',
    },{
      title: 'Trạng thái',
      group: 'Task',
      name: 'TaskStatus/Index',
    },{
      title: 'Mức độ gấp',
      group: 'Task',
      name: 'TaskPriority/Index',
    },{
      title: 'Loại công việc',
      group: 'Task',
      name: 'TaskType/Index',
    },{
      title: 'Thời gian lặp lại',
      group: 'Task',
      name: 'TaskLoop/Index',
    },{
      title: 'Quyền trạng thái công việc',
      group: 'Task',
      name: 'TaskStatusPermission/Index',
    }]
  },{
    title:'Biên nhận',
    icon:'edit',
    group: 'Receipt',
    items:[{
      title: 'Danh sách biên nhận',
      group: 'Receipt',
      name: 'Index',
    },{
      title: 'Trạng thái biên nhận',
      group: 'Receipt',
      name: 'ReceiptStatus/Index',
    },{
      title: 'Quyền trạng thái biên nhận',
      group: 'Receipt',
      name: 'ReceiptStatusPermission/Index',
    },{
      title: 'Danh sách dịch vụ',
      group: 'Receipt',
      name: 'ReceiptDescription/Index',
    }]
  },{
    title:'Bảo hành',
    icon:'autorenew',
    group: 'Warranty',
    items:[{
      title: 'Danh sách bảo hành',
      group: 'Warranty',
      name: 'Index',
    },{
      title: 'Trạng thái bảo hành',
      group: 'Warranty',
      name: 'WarrantyStatus/Index',
    },{
      title: 'Quyền trạng thái bảo hành',
      group: 'Warranty',
      name: 'WarrantyStatusPermission/Index',
    },{
      title: 'Mô tả bảo hành',
      group: 'Warranty',
      name: 'WarrantyDescription/Index',
    }]
  },{
    title:'Tuyển dụng',
    icon:'person_add',
    group: 'Recruitment',
    items:[{
      title: 'Danh sách ứng viên',
      group: 'Recruitment',
      name: 'Candidate/Index',
    },{
      title: 'Danh sách tuyển dụng',
      group: 'Recruitment',
      name: 'Index',
    },{
      title: 'Trạng thái ứng viên',
      group: 'Recruitment',
      name: 'CandidateStatus/Index',
    },{
      title: 'Trạng thái tuyển dụng',
      group: 'Recruitment',
      name: 'RecruitmentStatus/Index',
    }]
  },
  {
    title:'Hệ thống',
    icon:'settings_applications',
    group: 'Setting',
    items:[{
      title: 'Tham số cấu hình',
      group: 'Setting',
      name: 'AppConfig/Index',
    },{
      title: 'Chi nhánh',
      group: 'Setting',
      name: 'Branch/Index',
    },{
      title: 'Menu điều hướng',
      group: 'Setting',
      name: 'MainNavigation/Index',
    },{
      title: 'Nhóm menu điều hướng',
      group: 'Setting',
      name: 'MainNavigationGroup/Index',
    },{
      title: 'Danh sách người dùng',
      group: 'Setting',
      name: 'SystemUser/Index',
    },{
      title: 'Quyền hệ thống',
      group: 'Setting',
      name: 'SystemRole/Index',
    },{
      title: 'Biểu tượng',
      group: 'Setting',
      name: 'Admin/Icons',
    },{
      title: 'Nhật ký người dùng',
      group: 'Setting',
      name: 'UserActivityLog/Index',
    }]
  },
];

// reorder menu
// Menu.forEach(item => {
//   if (item.items) {
//     item.items.sort((x, y) => {
//       let textA = x.title.toUpperCase();
//       let textB = y.title.toUpperCase();
//       return textA < textB ? -1 : textA > textB ? 1 : 0;
//     });
//   }
// });

export default Menu;
