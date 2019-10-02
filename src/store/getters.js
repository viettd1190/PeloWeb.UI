const getters = {
  token: state => state.user.token,
  //refreshToken: state => state.user.refreshToken,
  loggedUser: state => state.user.loggedUser,

  // points: state => state.point.points,
  // routes: state => state.point.routes,
  // reloadRoutes: state => state.point.reloadRoutes,
  // route: state => state.point.editRoute,
  // routeInfo: state => state.point.routeInfo,
  // selectRoute: state => state.point.selectRoute,
  // vehicleList: state => state.vehicle.vehicleList,
  // users: state => state.user.users,
  // isUpdatePass: state => state.user.isUpdatePass,
  // editPoint: state => state.point.editPoint,
};
export default getters;
