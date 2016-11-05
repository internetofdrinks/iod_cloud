const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI || 'mongodb://bauske.org:27017/internetofdrinks';

class MongoDBUtils {
  
  static createPayloadJSON(payload) {
    return JSON.parse(JSON.stringify(payload));
  }
  
  
  static save(item) {
    MongoDBUtils.login();
    return new Promise((resolve, reject) => {
      item.save((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  
  static update(id, item) {
    MongoDBUtils.login();
    return new Promise((resolve, reject) => {
      item.save((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  
  static find(item, query = {}, sort = {}) {
    MongoDBUtils.login();
    return new Promise((resolve, reject) => {
      item.find(query).sort(sort).exec((err, docs) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }
  
  static findOne(item, query = {}, sort = {}) {
    MongoDBUtils.login();
    return new Promise((resolve, reject) => {
      item.findOne(query).sort(sort).exec((err, docs) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }
  
  static drop(item) {
    console.log(mongoose.connection.readyState);
    MongoDBUtils.login();
    return new Promise((resolve, reject) => {
      item.remove({}, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
  
  static login() {
    if (mongoose.connection.readyState === 0) {
      console.log('Do Login...');
      mongoose.connect(URI);
    } else {
      console.log('Will not login - since we\'re already logged in.');
    }
  }
}

module.exports = MongoDBUtils;
