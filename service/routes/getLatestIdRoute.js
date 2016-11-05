const Route = require('./route');
const Id = require('../schemas/id');
const MongoDBUtils = require('../utils/mongodbutils');

const REST_METHOD = 'GET';
const REST_PATH = '/ids/latest';

const routeHandler = (request, reply) => {
  MongoDBUtils.findOne(Id, {}, { 'date': 'desc' }).then((id) => {
    reply(id);
  }, (err) => {
    reply(err).code(500);
  });
};

class GetIdRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, {});
  }
}

module.exports = new GetIdRoute();
