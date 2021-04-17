const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// shortcut to reference Schema a little quicker

const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

module.exports = mongoose.model('Campground', CampgroundSchema);