const mongoose = require('mongoose');

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
}, {
  _id: false // Disable _id for subdocuments
});

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  degrees: [degreeSchema],
}, {
  timestamps: true,
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

module.exports = TeamMember;
