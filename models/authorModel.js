const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
});

const degreeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  courseId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  }],
  bio: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  authorReviews: [reviewSchema],
  degrees: [degreeSchema],
  experience: {
    type: String,
    required: true,
  },
  previousCompany: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
