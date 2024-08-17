const mongoose = require("mongoose");
const landSchema = new mongoose.Schema({
  name: String,
  area: String,
  state: String,
  district: String,
  taluka: String,
  price: String,
  PID: String,
  survay: String,
  isAccepted:Number
});

// Create a Model
module.exports = mongoose.model("LandModel", landSchema);
