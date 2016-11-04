const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI || 'mongodb://internet_of_drinks:dr1nk_b33r@ds143777.mlab.com:43777/internetofdrinks';


class MongoDBUtils {
  
  constructor(collection) {
    this.collection = collection;
  }
  
  createModel(model) {
    return mongoose.model(this.collection, model);
  }
  
  createPayloadJSON(payload){
    return JSON.parse(payload.toString());
  }
  
  save(item) {
    mongoose.connect(URI);
    console.log('Connected to: ' + URI);
    return new Promise((resolve, reject) => {
      item.save(function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = MongoDBUtils;