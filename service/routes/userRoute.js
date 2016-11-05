const Route = require('./route');
const MongoDBUtils = require('../utils/mongodbutils');

const REST_METHOD = 'POST';
const REST_PATH = '/user';
const DB_COLLECTION = 'user';
const DB_MODEL = {
  userid: String,
  firstname: String,
  lastname: String,
  email: String
};

const routeHandler = (request, reply) => {
  const payloadJSON = MongoDBUtils.createPayloadJSON(request.payload);
  const mongodbUtils = new MongoDBUtils(DB_COLLECTION);
  payloadJSON.date = Date.now();
  const User = mongodbUtils.createModel(DB_MODEL);
  mongodbUtils.save(new User(payloadJSON)).then(() => {
    reply().code(201);
  }, (err) => {
    reply(err).code(500);
  });
};


class BACRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, {});
  }
}

module.exports = new BACRoute();
