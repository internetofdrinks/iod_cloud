const BACRoute = require('./service/routes/bacRoute');
const IndexRoute = require('./service/routes/indexRoute');
const UserRoute = require('./service/routes/userRoute');
const RestService = require('./service/restService');

const routes = [BACRoute.getRoute(), IndexRoute.getRoute(), UserRoute.getRoute()];

// start REST service
const restService = new RestService(routes);
restService.start();
