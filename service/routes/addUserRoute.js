const Route = require('./route');
const MongoDBUtils = require('../utils/mongodbutils');
const User = require('../schemas/user');

const REST_METHOD = 'POST';
const REST_PATH = '/users';

const options = {
  payload: {
    parse: true
  }
};

const routeHandler = (request, reply) => {
  const payloadJSON = MongoDBUtils.createPayloadJSON(request.payload);
  payloadJSON.date = Date.now();
  MongoDBUtils.save(new User(payloadJSON)).then(() => {
    reply(payloadJSON).code(201);
  }, (err) => {
    reply(err).code(500);
  });
};

class AddUserRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, options);
  }
}

module.exports = new AddUserRoute();
