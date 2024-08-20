const mongoose = require('mongoose');

const phdHolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  fieldOfStudy: {
    type: String,
    required: true,
  },
  yearOfCompletion: {
    type: Number,
    required: true,
  },
  publications: {
    type: [String], // Array of publication titles
    default: [],
  },
  image: {
    type: String, // Path to the uploaded image
    required: false,
  },
}, {
  timestamps: true,
});

const PhdHolder = mongoose.model('PhdHolder', phdHolderSchema);

module.exports = PhdHolder;
