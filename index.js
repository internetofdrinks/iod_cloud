const TestRoute = require('./service/routes/testRoute');
const IndexRoute = require('./service/routes/indexRoute');
const FrontendRoute = require('./service/routes/frontendRoute');
const PublicRouter = require('./service/routes/publicRoute');
const RestService = require('./service/restService');

const routes = [TestRoute.getRoute(), IndexRoute.getRoute(), FrontendRoute.getRoute(), PublicRouter.getRoute()];

// start REST service
const restService = new RestService(routes);
restService.start();
