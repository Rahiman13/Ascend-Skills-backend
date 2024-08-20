const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  curriculum: {
    type: Map,
    of: [String],
    required: true,
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  image :{
    type:String,
    required: true,
  },
  review :{
    type:String,
  }
}, {
  timestamps: true,
});

const Internship = mongoose.model('Internship', internshipSchema);

module.exports = Internship;
