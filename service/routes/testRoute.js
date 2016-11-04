const Route = require('./route');
const logger = require('../utils/logger');
const MongoDBUtils = require('../utils/mongodbutils')


const REST_METHOD = 'POST';
const REST_PATH = '/blood';
const DB_COLLECTION = 'blood';
const DB_MODEL = {
  userid: String,
  level: Number,
  date: Date
};

const routeHandler = (request, reply) => {
  const mongoDBUtils = new MongoDBUtils(DB_COLLECTION);
  let BloodLevelEntry = mongoDBUtils.createModel(DB_MODEL);
  let bloodlevel = new BloodLevelEntry({userid: "1234", level: 1.105, date: Date.now()});
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
