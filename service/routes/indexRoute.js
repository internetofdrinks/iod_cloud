'use strict';
const Route = require('./route');
const logger = require('../utils/logger');

const REST_METHOD = 'POST';
const REST_PATH = '/foo';
const config = {
  payload: {
    output: 'stream',
    parse: true,
    allow: 'multipart/form-data'
  }
};

const routeHandler = (request, reply) => {
  reply('test worked fine - time for some beer! :)');
};

class IndexRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, config);
  }
}

module.exports = new TestRoute();
