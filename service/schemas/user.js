const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DB_COLLECTION = 'users';
const MODEL = {
  userid: {
    type: String,
    unique: true,
    index: true,
    dropDups: true
  },
  firstname: String,
  lastname: String,
  email: String
};

const schema = new Schema(MODEL);
schema.index({userid:1})

module.exports = mongoose.model(DB_COLLECTION, schema);