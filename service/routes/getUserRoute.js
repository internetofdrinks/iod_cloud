const Route = require('./route');
const logger = require('../utils/logger');
const MongoDBUtils = require('../utils/mongodbutils');
const User = require('../schemas/user');

const REST_METHOD = 'GET';
const REST_PATH = '/users/{userid}';
const options = {};

const routeHandler = (request, reply) => {
  MongoDBUtils.findOne(User, { "userid": request.params.userid }, { 'date': 'desc' }).then((user) => {
    reply(user);
  }, (err) => {
    reply(err).code(500);
  });
};

class GetUserRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, options);
  }
}

module.exports = new GetUserRoute();
