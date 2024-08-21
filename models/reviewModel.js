const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Course',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  rating: {
    type: String,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
