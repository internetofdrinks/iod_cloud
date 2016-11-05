const Route = require('./route');
const logger = require('../utils/logger');
const MongoDBUtils = require('../utils/mongodbutils');

const REST_METHOD = 'POST';
const REST_PATH = '/bac';
const DB_COLLECTION = 'bac';
const mongoDBUtils = new MongoDBUtils(DB_COLLECTION);
const BloodLevelEntry = mongoDBUtils.createModel({
  userid: String,
  baclevel: Number,
  date: Date
});
const options = {
  payload: {
    parse: true
  }
};

const routeHandler = (request, reply) => {
  const payloadJSON = MongoDBUtils.createPayloadJSON(request.payload);
  payloadJSON.date = Date.now();
  mongoDBUtils.save(new BloodLevelEntry(payloadJSON)).then(() => {
    reply().code(201);
  }, (err) => {
    reply(err).code(500);
  });
};

class BACRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, options);
  }
}

module.exports = new BACRoute();
