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
  author: {
    type: String,
    required: true,
  },
  authorImage: {
    type: String,
     required: false,
     default : null,

  },
  authorId:{
    type: mongoose.Schema.Types.ObjectId,
     required:true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default : null,
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
}, {
  timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
