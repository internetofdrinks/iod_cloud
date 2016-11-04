const TestRoute = require('./service/routes/testRoute');
const IndexRoute = require('./service/routes/indexRoute');
const RestService = require('./service/restService');

const routes = [TestRoute.getRoute(), IndexRoute.getRoute()];

// start REST service
const restService = new RestService(routes);
restService.start();
