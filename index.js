const AddBACRoute = require('./service/routes/addBACRoute');
const IndexRoute = require('./service/routes/indexRoute');
const AddUserRoute = require('./service/routes/addUserRoute');
const FrontendRoute = require('./service/routes/frontendRoute');
const PublicRouter = require('./service/routes/publicRoute');
const RestService = require('./service/restService');
const GetUserRoute = require('./service/routes/getUsersRoute');

const routes = [AddBACRoute.getRoute(), IndexRoute.getRoute(), FrontendRoute.getRoute(),
  PublicRouter.getRoute(), AddUserRoute.getRoute(), GetUserRoute.getRoute()];

// start REST service
const restService = new RestService(routes);
restService.start();
