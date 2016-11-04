const Route = require('./route');
const logger = require('../utils/logger');
const MongoDBUtils = require('../utils/mongodbutils')


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
  const payloadJSON = mongoDBUtils.createPayloadJSON(request.payload)
  payloadJSON.date = Date.now();
  let BloodLevelEntry = mongoDBUtils.createModel(DB_MODEL);
  let bloodlevel = new BloodLevelEntry(payloadJSON);
  mongoDBUtils.save(bloodlevel).then(()=> {
    reply().code(201)
  }, (err)=> {
    console.log(err);
    reply(err).code(500)
  })
};

class TestRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, {});
  }
}

module.exports = new TestRoute();
