const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const URI = process.env.MONGODB_URI || 'mongodb://internet_of_drinks:dr1nk_b33r@ds143777.mlab.com:43777/internetofdrinks';

class MongoDBUtils {

  createModel(collection, model) {
    return mongoose.model(collection, new Schema(model));
  }
  
  static createPayloadJSON(payload) {
    return JSON.parse(JSON.stringify(payload));
  }
  
  save(item) {
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
}

module.exports = MongoDBUtils;
