const Route = require('./route');
const logger = require('../utils/logger');
const MongoDBUtils = require('../utils/mongodbutils');
const User = require('../schemas/user');

const REST_METHOD = 'DELETE';
const REST_PATH = '/users/{userid}';
const options = {};

const routeHandler = (request, reply) => {
  MongoDBUtils.remove(User, { "userid": request.params.userid }).then((user) => {
    reply(user);
  }, (err) => {
    reply(err).code(500);
  });
};

class DeleteUserRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, options);
  }
}

module.exports = new DeleteUserRoute();
