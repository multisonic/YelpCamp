const mongoose = require('mongoose');
const { tall } = require('tall');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      // YOUR USER ID
      author: '608762450840f63d3af33343',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus omnis hic recusandae aspernatur rem aliquam consectetur, iste, aperiam sapiente quisquam reiciendis culpa adipisci dolorem sed odit officiis a similique corrupti.',
      price,
      geometry: { 
        type: 'Point',
        coordinates: [ 
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dudynuv36/image/upload/v1619780140/YelpCamp/eg5t9otexi2gqbvwlbz5.jpg',
          filename: 'YelpCamp/eg5t9otexi2gqbvwlbz5'
        },
        {
          url: 'https://res.cloudinary.com/dudynuv36/image/upload/v1619663852/YelpCamp/dwk1vrpzzblwdhpqwb2m.jpg',
          filename: 'YelpCamp/dwk1vrpzzblwdhpqwb2m'
        }
      ]
    })
    await camp.save()
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})