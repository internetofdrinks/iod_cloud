const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI || 'mongodb://bauske.org:27017/internetofdrinks';

class MongoDBUtils {
  
  static createPayloadJSON(payload) {
    return JSON.parse(JSON.stringify(payload));
  }
  
  static createBulk(item, data) {
    return new Promise((resolve, reject) => {
      item.create(data, (err) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
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
    return new Promise((resolve, reject) => {
      item.findOneAndUpdate({ "userid": id }, { $set: updateObject }, { new: true }, (err, newItem) => {
        console.log(err);
        console.log(newItem);
        if (err) {
          reject(err);
        } else {
          resolve(newItem);
        }
      });
    });
  }
  
  static find(item, query = {}, sort = {}, limit = 0) {
    MongoDBUtils.login();
    return new Promise((resolve, reject) => {
      item.find(query).sort(sort).limit(limit).exec((err, docs) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }
  
  static where(item, query = {}) {
    MongoDBUtils.login();
    return new Promise((resolve, reject) => {
      item.where(query).exec((err, docs) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }
  
  static findOne(item, query = {}, sort = { "date": "desc" }) {
    MongoDBUtils.login();
    return new Promise((resolve, reject) => {
        item.findOne(query).sort(sort).exec((err, docs) => {
          if (err) {
            reject(err);
          } else {
            resolve(docs);
          }
        });
      }
    );
  }
  
  static remove(item, query) {
    MongoDBUtils.login();
    return new Promise((resolve, reject) => {
      item.remove(query, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
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
  
  static
  login() {
    // only log in when not connected
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(URI);
    }
  }
}

module.exports = MongoDBUtils;
