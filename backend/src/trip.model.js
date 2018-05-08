const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema({
  destination: String,
  cost: Number,
  startdate: String,
  leavedate: String,
  image: String,
  travelCosts: Array,
  lodgingCosts: Array,
  miscCosts: Array
});

module.exports = mongoose.model('Trip', TripSchema);
