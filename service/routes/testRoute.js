const Route = require('./route');
const logger = require('../utils/logger');

const REST_METHOD = 'GET';
const REST_PATH = '/test';


const routeHandler = (request, reply) => {
  reply('test worked fine - time for some beer! :)');
};

class TestRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, {});
  }
}

module.exports = new TestRoute();
