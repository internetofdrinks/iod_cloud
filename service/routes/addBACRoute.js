const Route = require('./route');
const logger = require('../utils/logger');
const MongoDBUtils = require('../utils/mongodbutils');
const BAC = require('../schemas/bac');

const REST_METHOD = 'POST';
const REST_PATH = '/bac';

const options = {
  payload: {
    parse: true
  }
};

const routeHandler = (request, reply) => {
  const payloadJSON = MongoDBUtils.createPayloadJSON(request.payload);
  payloadJSON.date = Date.now();
  MongoDBUtils.save(new BAC(payloadJSON)).then(() => {
    reply(payloadJSON).code(201);
  }, (err) => {
    reply(err).code(500);
  });
};

class AddBACRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, options);
  }
}

module.exports = new AddBACRoute();
