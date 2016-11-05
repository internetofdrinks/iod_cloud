const Route = require('./route');
const logger = require('../utils/logger');
const MongoDBUtils = require('../utils/mongodbutils');

const REST_METHOD = 'POST';
const REST_PATH = '/car2go';

const options = {
  payload: {
    parse: true
  }
};

const routeHandler = (request, reply) => {
  const payloadJSON = MongoDBUtils.createPayloadJSON(request.payload);
  
};

class AddBACRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, options);
  }
}

module.exports = new AddBACRoute();
