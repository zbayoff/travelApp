const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema({
  destination: String,
  totalCost: Number,
  startdate: String,
  leavedate: String,
  image: String,
  url1: String,
  url2: String,
  travelCosts: [Schema.Types.Mixed],
  lodgingCosts: [Schema.Types.Mixed],
  miscCosts: [Schema.Types.Mixed]
});

module.exports = mongoose.model('Trip', TripSchema);
