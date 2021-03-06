const randomElement = (arr = []) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const kebab = str => {
  return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

const toggleFullScreen = () => {
  let doc = window.document;
  let docEl = doc.documentElement;

  let requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen;
  let cancelFullScreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen;

  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
};

export default {
  randomElement,
  toggleFullScreen,
  kebab
};
export let messageResult = {
  UpdateSuccess: 'Cập nhật thành công',
  InsertSuccess: 'Thêm mới thành công',
  RequestFail:
    'Vui lòng thử lại do kết nối không tốt hoặc máy chủ đang gặp sự cố!',
  Error: 'error',
  Success: 'success',
  DeleteSuccess: 'Xóa thành công'
};
export let method = {
  get: 'get',
  delete: 'delete',
  put: 'put',
  post: 'post'
};
export let url = {
  productGroup: {
    route: 'product_group',
    all: 'product_group/all',
    id: 'product_group/'
  },
  config: {
    route: 'config',
    all: 'config/all',
    id: 'config/'
  },
  branch: {
    route: 'branch',
    all: 'branch/all',
    id: 'branch/'
  },
  manufacturer: {
    route: 'manufacturer',
    all: 'manufacturer/all',
    id: 'manufacturer/'
  },
  province: {
    route: 'province',
    all: 'province/all',
    id: 'province/'
  },
  district: {
    route: 'district',
    all: 'district/all',
    id: 'district/'
  },
  ward: {
    route: 'ward',
    all: 'ward/all',
    id: 'ward/'
  },
  role: {
    route: 'role',
    all: 'role/all',
    id: 'role/'
  },
  user: {
    route: 'user',
    all: 'user/all',
    id: 'user/'
  },
  customer_group: {
    route: 'customer_group',
    all: 'customer_group/all',
    id: 'customer_group/'
  },
  customer_source: {
    route: 'customer_source',
    all: 'customer_source/all',
    id: 'customer_source/'
  },
  customer: {
    route: 'customer',
    all: 'customer/all',
    id: 'customer/',
    phone: 'customer/phone/',
    profit:'customer/profit/'

  },
  product_unit: {
    route: 'product_unit',
    all: 'product_unit/all',
    id: 'product_unit/'
  },
  product_status: {
    route: 'product_status',
    all: 'product_status/all',
    id: 'product_status/'
  },
  country: {
    route: 'country',
    all: 'country/all',
    id: 'country/'
  },
  crm_status: {
    route: 'crm_status',
    all: 'crm_status/all',
    id: 'crm_status/'
  },
  crm_priority: {
    route: 'crm_priority',
    all: 'crm_priority/all',
    id: 'crm_priority/'
  },
  crm: {
    route: 'crm',
    all: 'crm/all',
    id: 'crm/'
  },
  crm_type: {
    route: 'crm_type',
    all: 'crm_type/all',
    id: 'crm_type/'
  },
  product: {
    route: 'product',
    all: 'product/all',
    id: 'product/'
  },
  pay_method: {
    route: 'pay_method',
    all: 'pay_method/all',
    id: 'pay_method/'
  },
  task_priority: {
    route: 'task_priority',
    all: 'task_priority/all',
    id: 'task_priority/'
  },
  task_status: {
    route: 'task_status',
    all: 'task_status/all',
    id: 'task_status/'
  },
  task_type: {
    route: 'task_type',
    all: 'task_type/all',
    id: 'task_type/'
  },task_loop: {
    route: 'task_loop',
    all: 'task_loop/all',
    id: 'task_loop/'
  },
  invoice_status: {
    route: 'invoice_status',
    all: 'invoice_status/all',
    id: 'invoice_status/'
  },
  receipt_description: {
    route: 'receipt_description',
    all: 'receipt_description/all',
    id: 'receipt_description/'
  },
  receipt_status:{
    route: 'receipt_status',
    all: 'receipt_status/all',
    id: 'receipt_status/'
  },
  warranty_description:{
    route: 'warranty_description',
    all: 'warranty_description/all',
    id: 'warranty_description/'
  },
  warranty_status:{
    route: 'warranty_status',
    all: 'warranty_status/all',
    id: 'warranty_status/'
  },
  recruitment_status:{
    route: 'recruitment_status',
    all: 'recruitment_status/all',
    id: 'recruitment_status/'
  },
  candidate_status:{
    route: 'candidate_status',
    all: 'candidate_status/all',
    id: 'candidate_status/'
  },
  customer_vip:{
    route: 'customer_vip',
    all: 'customer_vip/all',
    id: 'customer_vip/'
  }
};
export let pagination = {
  keySearch: '',
  pageIndex: 1,
  pageSize: 10000
};
