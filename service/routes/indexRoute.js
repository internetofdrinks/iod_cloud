const Route = require('./route');
const logger = require('../utils/logger');

const REST_METHOD = 'GET';
const REST_PATH = '/';

const routeHandler = (request, reply) => {
  reply.file("frontend/index.html");
};

class IndexRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, {});
  }
}

module.exports = new IndexRoute();
