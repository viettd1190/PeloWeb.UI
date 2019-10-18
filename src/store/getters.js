const getters = {
  token: state => state.user.token,
  loggedUser: state => state.user.loggedUser,
  profile: state => state.user.profile,
  editAppConfig: state => state.setting.editAppConfig,
  editBranch: state => state.setting.editBranch,
  provinces: state => state.setting.provinces,
  districts: state => state.setting.districts,
  wards: state => state.setting.wards,
  editRole: state => state.setting.editRole,
  branchs: state => state.setting.branchs,
  users:state => state.setting.users,
};
export default getters;
