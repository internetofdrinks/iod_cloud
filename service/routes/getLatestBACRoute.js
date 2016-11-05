const Route = require('./route');
const logger = require('../utils/logger');
const MongoDBUtils = require('../utils/mongodbutils');
const BAC = require('../schemas/bac');

const REST_METHOD = 'GET';
const REST_PATH = '/bac/latest';
const options = {};

const routeHandler = (request, reply) => {
  MongoDBUtils.findOne(BAC, { 'date': 'desc' }).then((bacs) => {
    reply(bacs);
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
