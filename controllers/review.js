const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
  // const { id } = req.params;
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  // console.log("new review saved");
  // res.send("new review saved");
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destoryReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted!");
  res.redirect(`/listings/${id}`);
};
