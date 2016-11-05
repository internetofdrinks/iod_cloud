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
  
  static update(id, item, updateObject) {
    MongoDBUtils.login();
    item.findOneAndUpdate({userid:id}, updateObject, { new: true }, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log("RESULT: " + result);
    });
    /*return new Promise((resolve, reject) => {
     console.log('running promise!');
     item.findByIdAndUpdate(id, {$set:updateObject}, { new: true }, (err, newItem) => {
     console.log(err);
     console.log(newItem);
     if (err) {
     console.log('ERRRRR');
     reject(err);
     } else {
     console.log("resolved...");
     resolve(newItem);
     }
     });
     });*/
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
    // only log in when not connected
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(URI);
    }
  }
}

module.exports = MongoDBUtils;
