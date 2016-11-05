const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DB_COLLECTION = 'bac';
const MODEL = {
  userid: {
    type: String,
    required: true
  },
  baclevel: {
    type: Number,
    required: true
  },
  date: Date
};

const schema = new Schema(MODEL);

module.exports = mongoose.model(DB_COLLECTION, schema);