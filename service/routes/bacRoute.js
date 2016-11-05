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
  const mongoDBUtils = new MongoDBUtils(DB_COLLECTION);
  console.log(request.payload);
  const payloadJSON = mongoDBUtils.createPayloadJSON(request.payload)
  payloadJSON.date = Date.now();
  console.log(payloadJSON);
  const BloodLevelEntry = mongoDBUtils.createModel(DB_MODEL);
  mongoDBUtils.save(new BloodLevelEntry(payloadJSON)).then(()=> {
    reply().code(201)
  }, (err)=> {
    reply(err).code(500)
  })
};

class BACRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, {});
  }
}

module.exports = new BACRoute();
