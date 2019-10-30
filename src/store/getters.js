const getters = {
  token: state => state.user.token,
  loggedUser: state => state.user.loggedUser,
  profile: state => state.user.profile,
  provinces: state => state.setting.provinces,
  districts: state => state.setting.districts,
  wards: state => state.setting.wards,
  branchs: state => state.setting.branchs,
  users:state => state.setting.users,
  roles:state=>state.setting.roles,
  countries:state=>state.setting.countries
};
export default getters;
