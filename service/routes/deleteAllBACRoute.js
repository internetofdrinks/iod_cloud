const Route = require('./route');
const BAC = require('../schemas/bac');
const MongoDBUtils = require('../utils/mongodbutils');

const REST_METHOD = 'DELETE';
const REST_PATH = '/bac';

const routeHandler = (request, reply) => {
  MongoDBUtils.drop(BAC).then(() => {
    reply();
  }, (err) => {
    console.log('ERROR');
    reply(err).code(500);
  });
};

class DeleteAllBACRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, {});
  }
}

module.exports = new DeleteAllBACRoute();
