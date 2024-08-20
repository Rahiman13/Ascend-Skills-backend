const PhdHolder = require('../models/phdHolderModel');
const fs = require('fs');
const path = require('path');

// Get all PHD holders
const getPhdHolders = async (req, res) => {
  try {
    const phdHolders = await PhdHolder.find();
    res.json(phdHolders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get PHD holder by ID
const getPhdHolderById = async (req, res) => {
  try {
    const phdHolder = await PhdHolder.findById(req.params.id);
    if (phdHolder) {
      res.json(phdHolder);
    } else {
      res.status(404).json({ message: 'PHD holder not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new PHD holder
const createPhdHolder = async (req, res) => {
  const { name, university, fieldOfStudy, yearOfCompletion, publications } = req.body;
  const image = req.file ? req.file.path : null;

  const phdHolder = new PhdHolder({
    name,
    university,
    fieldOfStudy,
    yearOfCompletion,
    publications,
    image,
  });

  try {
    const newPhdHolder = await phdHolder.save();
    res.status(201).json(newPhdHolder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a PHD holder
const updatePhdHolder = async (req, res) => {
  const { name, university, fieldOfStudy, yearOfCompletion, publications } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const phdHolder = await PhdHolder.findById(req.params.id);

    if (phdHolder) {
      phdHolder.name = name || phdHolder.name;
      phdHolder.university = university || phdHolder.university;
      phdHolder.fieldOfStudy = fieldOfStudy || phdHolder.fieldOfStudy;
      phdHolder.yearOfCompletion = yearOfCompletion || phdHolder.yearOfCompletion;
      phdHolder.publications = publications || phdHolder.publications;

      if (image) {
        // Delete the old image if it exists
        if (phdHolder.image) {
          fs.unlinkSync(path.join(__dirname, '..', phdHolder.image));
        }
        phdHolder.image = image;
      }

      const updatedPhdHolder = await phdHolder.save();
      res.json(updatedPhdHolder);
    } else {
      res.status(404).json({ message: 'PHD holder not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a PHD holder
// @route   DELETE /api/phd-holders/:id
// @access  Public
const deletePhdHolder = async (req, res) => {
  try {
    const phdHolder = await PhdHolder.findById(req.params.id);

    if (phdHolder) {
      await PhdHolder.deleteOne({ _id: req.params.id });
      res.json({ message: 'PHD holder removed' });
    } else {
      res.status(404).json({ message: 'PHD holder not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get total count of PHD holders
// @route   GET /api/phd-holders/count
// @access  Public
const getPhdHolderCount = async (req, res) => {
  try {
    const count = await PhdHolder.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPhdHolders,
  getPhdHolderById,
  createPhdHolder,
  updatePhdHolder,
  deletePhdHolder,
  getPhdHolderCount,
};
