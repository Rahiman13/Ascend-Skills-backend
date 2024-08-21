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
    const phdHolderId = req.params.id;
    const { name, university, fieldOfStudy, yearOfCompletion, publications } = req.body;
    const image = req.file;

    // Fetch current PhD holder details to get old image path
    const phdHolder = await PhdHolder.findById(phdHolderId);

    // Handle old image deletion
    if (phdHolder.image && image) {
      const oldImagePath = path.join(__dirname, 'uploads', phdHolder.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Update PhD holder
    phdHolder.name = name;
    phdHolder.university = university;
    phdHolder.fieldOfStudy = fieldOfStudy;
    phdHolder.yearOfCompletion = yearOfCompletion;
    phdHolder.publications = publications;
    if (image) {
      phdHolder.image = image.filename;
    }
    await phdHolder.save();

    res.status(200).json(phdHolder);
  } catch (error) {
    res.status(400).json({ message: 'Error updating PhD holder', error });
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
