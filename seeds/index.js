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

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getImage() {
  const unsplashUrl = 'https://source.unsplash.com/collection/483251';
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  try {
    await delay(1000);
    return await tall(unsplashUrl);
  } catch (err) {
    console.error('AAAW 👻', err);
  }
}

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const image = await getImage();
    console.log(image)
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // image: 'https://source.unsplash.com/collection/483251',
      image: `${image}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus omnis hic recusandae aspernatur rem aliquam consectetur, iste, aperiam sapiente quisquam reiciendis culpa adipisci dolorem sed odit officiis a similique corrupti.',
      price //same as price: price
    })
    await camp.save()
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})