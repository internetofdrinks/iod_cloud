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
const DeleteAllUsersRoute = require('./service/routes/deleteAllUserRoute');
const UpdateUserRoute = require('./service/routes/updateUserRoute');
const AddLatestIdRoute = require('./service/routes/addIdRoute');
const GetLatestIdRoute = require('./service/routes/getLatestIdRoute');
const GetUserRoute = require('./service/routes/getUserRoute');
const DeleteUserRoute = require('./service/routes/deleteUserRoute');
const AddAlcCalcRoute = require('./service/routes/addAlcCalcRoute');

const GetAlcCalcLeaderRoute = require('./service/routes/getAlcCalcLeaderRoute');
const DeleteBACRoute = require('./service/routes/deleteBACRoute');


const routes = [AddBACRoute.getRoute(),
  IndexRoute.getRoute(),
  FrontendRoute.getRoute(),
  PublicRouter.getRoute(),
  AddUserRoute.getRoute(),
  DeleteAllUsersRoute.getRoute(),
  GetLatestBACRoute.getRoute(),
  GetBACsPerUser.getRoute(),
  GetBACSRoute.getRoute(),
  UpdateUserRoute.getRoute(),
  AddLatestIdRoute.getRoute(),
  GetLatestIdRoute.getRoute(),
  GetUserRoute.getRoute(),
  GetUsersRoute.getRoute(),
  DeleteUserRoute.getRoute(),
  GetAlcCalcLeaderRoute.getRoute(),
  AddAlcCalcRoute.getRoute(),
  DeleteBACRoute.getRoute()];

// start REST service
const restService = new RestService(routes);
restService.start();
