const Route = require('./route');

const REST_METHOD = 'GET';
const REST_PATH = '/public/{param*}';

class PublicRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, {
      directory: {
        path: 'frontend/public',
        index: true
      }
    }, {});
  }
}

module.exports = new PublicRoute();
