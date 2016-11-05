const Route = require('./route');
const User = require('../schemas/user');
const BAC = require('../schemas/bac');
const MongoDBUtils = require('../utils/mongodbutils');

const REST_METHOD = 'GET';
const REST_PATH = '/alccalc/leader';

const routeHandler = (request, reply) => {
  // get highest BAC leader and map it to a user
  MongoDBUtils.find(BAC, {}, { 'baclevel': 'desc' }, 100).then((bacs) => {
    const userIds = new Map();
    
    for (const entry of bacs) {
      if (!userIds.has(entry.userid)) {
        userIds.set(entry.userid, { userid: entry.userid, baclevel: entry.baclevel });
        if (userIds.size > 5) {
          break;
        }
      }
    }
    MongoDBUtils.where(User, { "userid": { $in: Array.from(userIds.keys()) } }, {}).then((users) => {
      let counter = 1;
      for (const user of users) {
        const userItem = userIds.get(user.userid);
        userItem.rank = counter++;
        userItem.firstname = user.firstname;
        userItem.lastname = user.lastname;
        userIds.set(userItem.userid, userItem);
      }
      
      reply(Array.from(userIds.values()));
    }, (err) => {
      reply(err).code(500);
    })
  }, (err) => {
    reply(err).code(500);
  });
};

class GetAlcCalcLeaderRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, {});
  }
}

module.exports = new GetAlcCalcLeaderRoute();
