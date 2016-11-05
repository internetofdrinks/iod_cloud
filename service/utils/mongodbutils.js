const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI || 'mongodb://bauske.org:27017/internetofdrinks';

class MongoDBUtils {
  
  static createPayloadJSON(payload) {
    return JSON.parse(JSON.stringify(payload));
  }
  
  static save(item) {
    mongoose.connect(URI);
    return new Promise((resolve, reject) => {
      item.save((err) => {
        mongoose.disconnect();
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  
  static find(item, query={}, sort={}) {
    mongoose.connect(URI);
    return new Promise((resolve, reject) => {
      item.find(query).sort(sort).exec((err, docs) => {
        mongoose.disconnect();
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }
  
  static findOne(item, query={}, sort={}) {
    mongoose.connect(URI);
    return new Promise((resolve, reject) => {
      item.findOne(query).sort(sort).exec((err, docs) => {
        mongoose.disconnect();
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }
  
  static drop(item) {
    return new Promise((resolve, reject) => {
      item.remove({}, (err) => {
        console.log("remove doen...");
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}

module.exports = MongoDBUtils;
