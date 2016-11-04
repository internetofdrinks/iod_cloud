const TestRoute = require('./service/routes/testRoute');
const RestService = require('./service/RESTService');
const routes = [TestRoute.getRoute()];

// start REST service
const restService = new RestService(routes);
restService.start();
