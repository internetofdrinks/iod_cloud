const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DB_COLLECTION = 'users';
const MODEL = {
  userid: String,
  firstname: String,
  lastname: String,
  email: String
};

const schema = new Schema(MODEL);

module.exports = mongoose.model(DB_COLLECTION, schema);