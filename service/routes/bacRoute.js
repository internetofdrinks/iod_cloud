const Route = require('./route');
const logger = require('../utils/logger');
const MongoDBUtils = require('../utils/mongodbutils');

const REST_METHOD = 'POST';
const REST_PATH = '/bac';
const DB_COLLECTION = 'bac';
const DB_MODEL = {
  userid: String,
  baclevel: Number,
  date: Date
};

const routeHandler = (request, reply) => {
  logger.debug(request.payload);
  const payloadJSON = MongoDBUtils.createPayloadJSON(request.payload);
  payloadJSON.date = Date.now();
  logger.debug(payloadJSON);
  const BloodLevelEntry = MongoDBUtils.createModel(DB_COLLECTION, DB_MODEL);
  MongoDBUtils.save(new BloodLevelEntry(payloadJSON)).then(() => {
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