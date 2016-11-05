const Route = require('./route');
const User = require('../schemas/user');
const MongoDBUtils = require('../utils/mongodbutils');

const REST_METHOD = 'DELETE';
const REST_PATH = '/users';

const routeHandler = (request, reply) => {
  MongoDBUtils.drop(User).then(() => {
    console.log('deleted');
    reply(true);
  }, (err) => {
    console.log('ERROR');
    reply(err).code(500);
  });
};

class DeleteAllRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, {});
  }
}

module.exports = new DeleteAllRoute();
