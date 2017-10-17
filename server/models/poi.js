const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const poiSchema = new Schema({
  name: String,
  description: String,
  tags: [String],
  img_url: String,
  latitude: Number,
  longitude: Number
})

module.exports = mongoose.model('poi', poiSchema);