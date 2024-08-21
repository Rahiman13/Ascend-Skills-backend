const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  authorImage: {
    type: String,
    // required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  courseRating: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  curriculum: {
    type: Map,
    of: [String],
    required: true,
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
}, {
  timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;