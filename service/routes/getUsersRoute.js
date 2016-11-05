const Route = require('./route');
const User = require('../schemas/user');
const MongoDBUtils = require('../utils/mongodbutils');

const REST_METHOD = 'GET';
const REST_PATH = '/users';

const routeHandler = (request, reply) => {
  MongoDBUtils.find(User).then((users) => {
    reply(users);
  }, (err) => {
    reply(err).code(500);
  });
};

class GetUsersRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, {});
  }
}

module.exports = new GetUsersRoute();
