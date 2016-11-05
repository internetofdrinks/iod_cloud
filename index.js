const AddBACRoute = require('./service/routes/addBACRoute');
const IndexRoute = require('./service/routes/indexRoute');
const AddUserRoute = require('./service/routes/userRoute');
const FrontendRoute = require('./service/routes/frontendRoute');
const PublicRouter = require('./service/routes/publicRoute');
const RestService = require('./service/restService');

const routes = [BACRoute.getRoute(), IndexRoute.getRoute(), FrontendRoute.getRoute(),
  PublicRouter.getRoute(), UserRoute.getRoute()];

// start REST service
const restService = new RestService(routes);
restService.start();
