const AddBACRoute = require('./service/routes/addBACRoute');
const IndexRoute = require('./service/routes/indexRoute');
const AddUserRoute = require('./service/routes/addUserRoute');

const RestService = require('./service/restService');

const routes = [IndexRoute.getRoute(),
  AddBACRoute.getRoute(),
  AddUserRoute.getRoute()];

// start REST service
const restService = new RestService(routes);
restService.start();
