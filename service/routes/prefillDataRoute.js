const Route = require('./route');
const logger = require('../utils/logger');
const MongoDBUtils = require('../utils/mongodbutils');
const BAC = require('../schemas/bac');
const User = require('../schemas/user');

const USERS_DUMP = JSON.parse('[{"userid":"4226da2e74980","firstname":"David","lastname":"Bauske","email":"david.bauske@googlemail.com","height":183,"weight":75,"gender":"male","age":23,"gametype":"sober","goal":"0.3","timegoal":"1478451600"},{"userid":"4396da2e74980","firstname":"Sascha","lastname":"Sambale","email":"sascha.sambale@gmail.com","height":188,"weight":85,"gender":"male","gametype":"constant","age":35,"goal":"0.3","timegoal":"1478419200"},{"userid":"4386da2e74980","firstname":"Martin","lastname":"Aulich","email":"m.a@test.net","height":165,"weight":120,"gender":"male","gametype":"constant","goal":"0.5","age":27},{"userid":"4236da2e74980","firstname":"Max","lastname":"Partenfelder","gametype":"constant","goal":"1.3","age":23,"gender":"male","weight":65,"height":178,"email":"maxpartenfelder@gmail.com"}]');
const BAC_DUMP = require('./bac.config.json');
const REST_METHOD = 'POST';
const REST_PATH = '/reset';

const options = {
  payload: {
    parse: true
  }
};

const routeHandler = (request, reply) => {
  MongoDBUtils.drop(User).then(() => {
    console.log('deleted User');
    MongoDBUtils.createBulk(User, USERS_DUMP).then((data) => {
      MongoDBUtils.drop(BAC).then(() => {
        console.log('deleted BAC');
        const newBacDataDump = [];
        for (bacData of BAC_DUMP) {
          console.log(bacData.userid);
          let count = 5;
          for (level of bacData.baclevel) {
            const data = {}
            data.userid = bacData.userid;
            console.log(level);
            data.baclevel = level;
            data.date = Date.now() - (count-- * (Math.floor(Math.random() * 600000) + 3000000));
            console.log(count+'/'+data.date);
            newBacDataDump.push(data);
          }
          console.log(newBacDataDump);
        }
        MongoDBUtils.createBulk(BAC, newBacDataDump).then(() => {
          reply("RESET FINISHED!").code(201);
        }, (err) => {
          reply(err).code(500);
        });
      }, (err) => {
        console.log('ERROR');
        reply(err).code(500);
      });
    }, (err) => {
      replay(err).code(500);
    });
  }, (err) => {
    console.log('ERROR');
    reply(err).code(500);
  });
};

class PrefillDataRoute extends Route {
  constructor() {
    super(REST_METHOD, REST_PATH, routeHandler, options);
  }
}

module.exports = new PrefillDataRoute();
