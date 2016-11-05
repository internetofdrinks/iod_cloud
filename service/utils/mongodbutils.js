const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI || 'mongodb://internet_of_drinks:dr1nk_b33r@ds143777.mlab.com:43777/internetofdrinks';

class MongoDBUtils {
  
  static createPayloadJSON(payload) {
    return JSON.parse(JSON.stringify(payload));
  }
  
  static save(item) {
    mongoose.connect(URI);
    return new Promise((resolve, reject) => {
      item.save((err) => {
        if (err) {
          reject(err);
        } else {
          mongoose.disconnect();
          resolve();
        }
      });
    });
  }
  
  static find(item) {
    mongoose.connect(URI);
    return new Promise((resolve, reject) => {
      item.find({}, (err, docs) => {
        console.log(docs);
        if (err) {
          reject(err);
        } else {
          mongoose.disconnect();
          resolve(docs);
        }
      });
    });
  }
}

module.exports = MongoDBUtils;
