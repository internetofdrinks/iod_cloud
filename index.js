const BACRoute = require('./service/routes/bacRoute');
const IndexRoute = require('./service/routes/indexRoute');
const RestService = require('./service/restService');

const routes = [BACRoute.getRoute(), IndexRoute.getRoute()];

// start REST service
const restService = new RestService(routes);
restService.start();
