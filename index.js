const AddBACRoute = require('./service/routes/addBACRoute');
const GetBACSRoute = require('./service/routes/getBACSRoute');
const GetLatestBACRoute = require('./service/routes/getLatestBACRoute');
const GetBACsPerUser = require('./service/routes/getBACsPerUserRoute');
const IndexRoute = require('./service/routes/indexRoute');
const AddUserRoute = require('./service/routes/addUserRoute');
const FrontendRoute = require('./service/routes/frontendRoute');
const PublicRouter = require('./service/routes/publicRoute');
const RestService = require('./service/restService');
const GetUsersRoute = require('./service/routes/getUsersRoute');
const DeleteUserRoute = require('./service/routes/deleteAllUserRoute');
const UpdateUserRoute = require('./service/routes/updateUserRoute');
const AddLatestIdRoute = require('./service/routes/addIdRoute');
const GetLatestIdRoute = require('./service/routes/getLatestIdRoute');
const GetUserRoute = require('./service/routes/getUserRoute');

const AlcCalcRoute = require('./service/routes/addAlcCalcRoute');

const routes = [AddBACRoute.getRoute(),
  IndexRoute.getRoute(),
  FrontendRoute.getRoute(),
  PublicRouter.getRoute(),
  AddUserRoute.getRoute(),
  DeleteUserRoute.getRoute(),
  GetUsersRoute.getRoute(),
  GetLatestBACRoute.getRoute(),
  GetBACsPerUser.getRoute(),
  GetBACSRoute.getRoute(),
  UpdateUserRoute.getRoute(),
  AddLatestIdRoute.getRoute(),
  GetLatestIdRoute.getRoute(),
  AlcCalcRoute.getRoute(),
  GetUserRoute.getRoute()];

// start REST service
const restService = new RestService(routes);
restService.start();
