const AddBACRoute = require('./service/routes/addBACRoute');
const GetBACRoute = require('./service/routes/getBACRoute');
const GetLatestBACRoute = require('./service/routes/getLatestBACRoute');
const GetBACsPerUser = require('./service/routes/getBACsPerUserRoute');


const IndexRoute = require('./service/routes/indexRoute');
const AddUserRoute = require('./service/routes/addUserRoute');
const FrontendRoute = require('./service/routes/frontendRoute');
const PublicRouter = require('./service/routes/publicRoute');
const RestService = require('./service/restService');
const GetUserRoute = require('./service/routes/getUsersRoute');
const DeleteUserRoute = require('./service/routes/deleteAllUserRoute');


const routes = [AddBACRoute.getRoute(),
  IndexRoute.getRoute(),
  FrontendRoute.getRoute(),
  PublicRouter.getRoute(),
  AddUserRoute.getRoute(),
  DeleteUserRoute.getRoute(),
  GetUserRoute.getRoute(),
  GetLatestBACRoute.getRoute(),
  GetBACsPerUser.getRoute(),
  GetBACRoute.getRoute()];

// start REST service
const restService = new RestService(routes);
restService.start();
