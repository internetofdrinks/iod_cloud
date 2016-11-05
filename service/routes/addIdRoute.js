const Route = require('./route');
const MongoDBUtils = require('../utils/mongodbutils');
const Id = require('../schemas/id');

const REST_METHOD = 'POST';
const REST_PATH = '/ids';

const options = {
  payload: {
    parse: true
  }
};

const routeHandler = (request, reply) => {
  const payloadJSON = MongoDBUtils.createPayloadJSON(request.payload);
  payloadJSON.date = Date.now();
  MongoDBUtils.save(new Id(payloadJSON)).then(() => {
    reply(payloadJSON).code(201);
  }, (err) => {
    reply(err).code(500);
  });
};

class AddIdRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, options);
  }
}

module.exports = new AddIdRoute();
