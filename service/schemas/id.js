const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DB_COLLECTION = 'ids';
const MODEL = {
  userid: {
    type: String,
    required: true
  },
  date: Date
};

const schema = new Schema(MODEL);

module.exports = mongoose.model(DB_COLLECTION, schema);