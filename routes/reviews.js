const express = require('express');
const router = express.Router({ mergeParams: true })
const { validateReview } = require('../middleware');
const Campground = require('../models/campground');
const Review = require('../models/review');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

router.post('/', validateReview, catchAsync(async(req,res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  const { body, rating } = req.body.review;
  const review = new Review({ body, rating});
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash('success', 'Created new review!');
  res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:reviewId', catchAsync(async(req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Successfully deleted review');
  res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;