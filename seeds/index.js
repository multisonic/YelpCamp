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
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      author: '608762450840f63d3af33343',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: 'https://res.cloudinary.com/dudynuv36/image/upload/v1619665280/YelpCamp/awfzw5f0rl6taj1kfthm.jpg',
          filename: 'YelpCamp/awfzw5f0rl6taj1kfthm'
        },
        {
          url: 'https://res.cloudinary.com/dudynuv36/image/upload/v1619665280/YelpCamp/ttp9w77ma5vscbcxnoyx.jpg',
          filename: 'YelpCamp/ttp9w77ma5vscbcxnoyx'
        }
      ],
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus omnis hic recusandae aspernatur rem aliquam consectetur, iste, aperiam sapiente quisquam reiciendis culpa adipisci dolorem sed odit officiis a similique corrupti.',
      price //same as price: price
    })
    await camp.save()
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})