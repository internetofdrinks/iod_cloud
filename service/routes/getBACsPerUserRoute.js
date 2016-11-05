const Route = require('./route');
const logger = require('../utils/logger');
const MongoDBUtils = require('../utils/mongodbutils');
const BAC = require('../schemas/bac');

const REST_METHOD = 'GET';
const REST_PATH = '/bac/{id}';
const options = {};

const routeHandler = (request, reply) => {
  console.log("Getting BAC for: "+request.params.id);
  MongoDBUtils.find(BAC, { 'userid': request.params.id.toString() }).then((bacs) => {
    reply(bacs);
  }, (err) => {
    reply(err).code(500);
  });
};

class GetBACsPerUserRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, options);
  }
}

module.exports = new GetBACsPerUserRoute();
