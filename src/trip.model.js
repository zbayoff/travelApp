const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema({
  destination: String,
  startdate: Date,
  leavedate: Date,
  image: Object,
  costs: Array,
  totalCost: Number
});

module.exports = mongoose.model('Trip', TripSchema);
