const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// shortcut to reference Schema a little quicker

const CampgroundSchema = new Schema({
  title: String,
  price: String,
  description: String,
  location: String
})

module.exports = mongoose.model('Campground', CampgroundSchema);