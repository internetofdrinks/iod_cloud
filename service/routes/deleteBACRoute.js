const Route = require('./route');
const logger = require('../utils/logger');
const MongoDBUtils = require('../utils/mongodbutils');
const BAC = require('../schemas/bac');

const REST_METHOD = 'DELETE';
const REST_PATH = '/bac/{userid}';
const options = {};

const routeHandler = (request, reply) => {
  MongoDBUtils.remove(BAC, { "userid": request.params.userid }).then((bac) => {
    reply(bac);
  }, (err) => {
    reply(err).code(500);
  });
};

class DeleteBACRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, options);
  }
}

module.exports = new DeleteBACRoute();
