const Route = require('./route');
const logger = require('../utils/logger');
const MongoDBUtils = require('../utils/mongodbutils');
const User = require('../schemas/user');
const BAC = require('../schemas/bac');

const AlcoholUtils = require('../utils/alcoholutils');

const REST_METHOD = 'GET';
const REST_PATH = '/alccalc/{userid}/{hours?}';

const options = {};

const routeHandler = (request, reply) => {
  // get user and start calculation based on his data
  MongoDBUtils.findOne(User, { "userid": request.params.userid }).then((user) => {
    MongoDBUtils.findOne(BAC, { "userid": request.params.userid }, { 'date': 'desc' }).then((bac) => {
      reply(AlcoholUtils.calcRestAlc(user, bac, request.params.hours));
    }, (err) => {
      reply(err).code(500);
    });
  }, (err) => {
    reply(err).code(500);
  });
};

class AddConstantAlcCalcRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, options);
  }
}

module.exports = new AddConstantAlcCalcRoute();
